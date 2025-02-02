const {
  BadRequestError,
  NotFoundError,
} = require("../errors");
const Student = require("../models/Student");
const Group = require("../models/Group");
const { StatusCodes } = require("http-status-codes");
const FileService = require('../upload/upload_file')

const getAllStudents = async (req, res) => {
  const students = await Student.find().sort('full_name');
  res.status(StatusCodes.OK).json({ students, total: students.length });
};

const getOneStudent = async (req, res) => {
  const {name} = req.params
  const student = await Student.findByName(name);
  if (!student) {
    throw new NotFoundError(`No Student with id: ${name}`);
  }
  res.status(StatusCodes.OK).json(student);
};

const createStudent = async (req, res) => {
  try {
    const { full_name, phone_student, subject, parents_name, phone_parents } = req.body;
    const { image } = req.files;

    // Validate required fields
    if (!full_name || !phone_student || !subject || !parents_name || !phone_parents || !image) {
      return res.status(400).json({ msg: "Please provide all the required fields, including an image." });
    }

    const fileName = FileService.save(image);

    const student = await Student.create({
      full_name,
      phone_student,
      subject,
      parents_name,
      phone_parents,
      image: fileName,
    });

    return res.status(201).json({
      message: "New student added successfully",
      student,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Something went wrong", error: error.message });
  }
};


const updateStudent = async (req, res) => {
  const {id} = req.params
  const {full_name, phone_student, subject, parents_name, phone_parents} = req.body
  if(!full_name || !phone_student || !subject || !parents_name || !phone_parents){
    throw new BadRequestError('Please provide all the required fields')
  }
  const student = await Student.findByIdAndUpdate({_id: id}, req.body, {new:true, runValidators:true})
  if(!student){
    throw new NotFoundError(`No Student with id: ${id}`)
  }
  res.status(StatusCodes.OK).json(student)
}

const deleteStudent = async (req, res) => {
  const {id} = req.params
  const student = await Student.findByIdAndDelete(id)
  if(!student){
    return(404).send(`No Student with id: ${id}`)
  }
  res.status(StatusCodes.OK).send('Deleted successfully')
};
module.exports = {
  getAllStudents,
  getOneStudent,
  updateStudent,
  createStudent,
  deleteStudent,
};
