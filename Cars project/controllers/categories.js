const Category = require("../models/Category");

const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};

const getOneCategory = async(req, res) => {
  const {brand} = req.params
  const category = await Category.findByFullName(brand)
  res.status(200).json(category)
}

const addCategory = async (req, res) => {
  const category = await Category.create();
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
  const { name } = req.query;
  const searchedValue = await Category.find({
    name: { $regex: name, $options: "i" },
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
