const Category = require("../models/Category");
const Car = require('../models/Car')
const BaseError = require('../errors/base_error')
const fileService = require('../service/fileService')

const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};

const getOneCategory = async(req, res) => {
  const {brand} = req.params
  const category = await Category.findOne({brand: {$regex:brand, $options: 'i'}})
  if(!category){
    return BaseError.NotFoundError('Such brand not found')
  }
  const cars = await Car.find({category:category._id})
  res.status(200).json(cars)
}


const addCategory = async (req, res) => {
  const {brand} = req.body
  const {image} = req.files
  const imageName = fileService.save(image)
  const category = await Category.create({
    brand,
    image: imageName
  })
  res.status(201).json({
    msg: "category added successfully",
    category});
};

const updateCategory = async (req, res) => {
  const {id} = req.params
  const category = await Category.findByIdAndUpdate({_id: id}, req.body,
    {new:true, runValidators:true}
  )
  res.status(200).json({
    msg: "category updated successfully",
    category})
}

const deleteCategory = async (req, res) => {
  const {id} = req.params
    await Category.findByIdAndDelete({_id: id})
  res.status(200).json({msg:"deleted successfully"})
}

const search = async (req, res) => {
  const { brand } = req.query;
  console.log(brand);
  
  const searchedValue = await Category.findOne({
    brand: { $regex: brand, $options: "i" },
  });
  res.status(200).json(searchedValue)
};

module.exports = {
  getAllCategories,
  addCategory,
  search,
  getOneCategory,
  updateCategory,
  deleteCategory
};
