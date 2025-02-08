const Author = require("../models/author");
const BaseError = require('../errors/base_error')
const Book = require('../models/book');

const getAllAuthors = async (req, res) => {
  const authors = await Author.find();
  res.status(200).json({authors});
};

const getAuthor = async(req, res) => {
  const {id} = req.params
  const author = await Author.findById(id)  
  if(!author){
     throw BaseError.NotFoundError(`There is no author with id: ${id}`)
  }
  const books = await Book.find({author_info: id})
  res.status(200).json({author, books})
}

const addAuthor = async (req, res) => {
  if(!req.fileUrl){
    throw BaseError.BadRequestError('You should upload an image')
  }
  const {name, birth_year, death_year, category, nation} = req.body
  const author = await new Author({
    name,
    birth_year,
    death_year,
    nation,
    category,
    image: req.fileUrl
  });
  author.save()
  res.status(201).json({
    message: "author added successfully",
    author});
};

const updateAuthor = async (req, res) => {
  const {id} = req.params
  const author = await Author.findByIdAndUpdate({_id: id}, req.body,
    {new:true, runValidators:true}
  )
  res.status(200).json({
    message: "The author updated successfully",
    author})
}

const deleteAuthor = async (req, res) => {
  const {id} = req.params
   await Author.findByIdAndDelete(id)
  res.status(200).json({message:"The author deleted successfully"})
}

const search = async (req, res) => {
  const { name } = req.query;
  const searchedValue = await Author.find({
    name: { $regex: name, $options: "i" },
  });
  res.status(200).json({searchedValue})
};

module.exports = {
  getAllAuthors,
  addAuthor,
  search,
  getAuthor,
  updateAuthor,
  deleteAuthor
};
