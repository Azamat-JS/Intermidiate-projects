const Author = require("../models/author");

const getAllCategories = async (req, res) => {
  const authors = await Author.find();
  res.status(200).json(authors);
};

const getOneCategory = async(req, res) => {
  const {name} = req.params
  const author = await Author.findByFullName(name)
  res.status(200).json(author)
}

const addCategory = async (req, res) => {
  const author = await Author.create({ ...req.body });
  res.status(201).json({
    msg: "author added successfully",
    author});
};

const updateCategory = async (req, res) => {
  const {id} = req.params
  const author = await Author.findByIdAndUpdate({_id: id}, req.body,
    {new:true, runValidators:true}
  )
  res.status(200).json({
    msg: "author updated successfully",
    author})
}

const deleteCategory = async (req, res) => {
  const {id} = req.params
  const author = await Author.findByIdAndDelete({_id: id})
  res.status(200).json({msg:"deleted successfully"})
}

const search = async (req, res) => {
  const { name } = req.query;
  const searchedValue = await Author.find({
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
