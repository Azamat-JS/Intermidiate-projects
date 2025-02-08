const Category = require("../models/categories.Schema");
const Author = require("../models/author");
const BaseError = require("../errors/base_error");

const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  if (!categories) {
    throw BaseError.NotFoundError("Categories not found");
  }
  res.status(200).json(categories);
// await Category.deleteMany()
// res.send('yes')
};

const createCategory = async (req, res) => {
  if (!req.fileUrl) {
    throw BaseError.BadRequestError("You should upload an image");
  }
  const {name} = req.body
  const category = await new Category({
    name,
    image: req.fileUrl
  });
  res
    .status(201)
    .json({ message: "New category added successfully", category });
};

const getOneCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    throw BaseError.NotFoundError(`There is no category with id: ${id}`);
  }
  const authors = await Author.find({ category: category.name });
  if (!authors) {
    throw BaseError.NotFoundError("There is no author in this category");
  }

  res.status(200).json({ category, authors });
};

module.exports = {
  getAllCategories,
  createCategory,
  getOneCategory,
};
