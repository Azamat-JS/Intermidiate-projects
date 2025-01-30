const Author = require("../models/author");

const getAllAuthors = async (req, res) => {
  const authors = await Author.find();
  res.status(200).json(authors);
};

const getAuthor = async(req, res) => {
  const {name} = req.params
  const author = await Author.findOne({name: {$regex: name, $options: 'i'}})
  res.status(200).json(author)
}

const addAuthor = async (req, res) => {
  const author = await Author.create(req.body);
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
  const author = await Author.findByIdAndDelete({_id: id})
  res.status(200).json({message:"The author deleted successfully"})
}

const search = async (req, res) => {
  const { name } = req.query;
  const searchedValue = await Author.find({
    name: { $regex: name, $options: "i" },
  });
  res.status(200).json(searchedValue)
};

module.exports = {
  getAllAuthors,
  addAuthor,
  search,
  getAuthor,
  updateAuthor,
  deleteAuthor
};
