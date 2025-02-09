const Category = require("../models/Category");
const Car = require('../models/Car')
const BaseError = require('../errors/base_error')

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
  try {
  

    if (!req.fileUrl) {
      return res.status(400).json({ msg: "Please upload an image" });
    }

    const { brand } = req.body;

    const category = await Category.create({
      brand,
      image: req.fileUrl,
    });

    res.status(201).json({
      msg: "Category added successfully",
      category,
    });
  } catch (err) {
    console.error("Error in addCategory:", err);
    res.status(500).json({
      msg: "Error adding category",
      error: err.message,
    });
  }
};


const updateCategory = async (req, res) => {
  const {categoryId} = req.params
  const editCategory = req.body
  if(req.fileUrl){
    editCategory.image = req.fileUrl
  }
  const category = await Category.findByIdAndUpdate(categoryId, editCategory,
    {new:true, runValidators:true}
  )
  res.status(200).json({
    msg: "category updated successfully",
    category})
}

const deleteCategory = async (req, res) => {
  const {categoryId} = req.params
    await Category.findByIdAndDelete(categoryId)
  res.status(200).json({msg:"The category deleted successfully"})
}

module.exports = {
  getAllCategories,
  addCategory,
  getOneCategory,
  updateCategory,
  deleteCategory
};
