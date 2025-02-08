const BaseError = require("../errors/base_error");
const Book = require("../models/book");
const Comment = require("../models/comments");
const os = require('os');

const getAllBooks = async (req, res) => {
  const { name, sort, numericFilters, fields } = req.query;
  const queryObject = {};
  
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, key, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [key]: Number(value) };
      }      
    });
  }

  let result = Book.find(queryObject).populate("author_info", "name")
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  if(fields){
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 5
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)
  const books = await result;
  res.status(200).json({ books, count: books.length });
};

const getSingleBook = async(req, res) => {
  const {bookId} = req.params
  const comment = await Comment.find({book:bookId})
  const book = await Book.findById(bookId).populate("author_info", "-_id, name").populate("comments", "comment")
  res.status(200).json({book, comment})
}

const createBook = async(req, res) =>{
  if (!req.fileUrl) {
    throw BaseError.BadRequestError("You should upload an image");
  }
 const book = await new Book({...req.body, image: req.fileUrl})
 book.save()
  res.status(201).json({
    msg: "book added successfully",
    book})
}

const updateBook = async(req, res) => {
  const {bookId} = req.params
  const updateBook = req.body
  if(req.fileUrl){
    updateBook.image = req.fileUrl
  }
  const book = await Book.findByIdAndUpdate(bookId, updateBook,
    {new:true, runValidators:true}
  )
  res.status(201).json({
    msg: "book updated successfully",
    book})
}

const deleteBook = async(req, res) => {
  const {bookId} = req.params
  const book = await Book.findByIdAndDelete(bookId)
  if(!book){
    throw BaseError.NotFoundError(`There is no error with id: ${id}`)
  }
  res.status(200).send('book deleted successfully')
}


module.exports = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
};

