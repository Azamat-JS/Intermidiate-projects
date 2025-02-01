const Appeal = require('../models/appeals_schema')
const NotFoundError = require("../errors/not-found");
const BadRequestError = require('../errors/bad-request')
const {StatusCodes} = require('http-status-codes')


const writeAppeal = async(req, res) => {
    const appeal = await Appeal.create(req.body)
    if(!appeal){
        throw BadRequestError('Please provide requirements')
    }
    res.status(StatusCodes.CREATED).json({message: 'appeal created successfully', appeal})
}

const getAllAppeals = async(req, res)=> {
    const appeals = await Appeal.find()
    res.status(StatusCodes.OK).json(appeals)
}

const deleteAppeal = async(req, res) => {
    const {id} = req.params

  const deletingAppeal = await Appeal.findByIdAndDelete(id)
  if(!deletingAppeal){
    throw NotFoundError(`There is no appeal with id: ${id}`)
  }
    res.status(StatusCodes.OK).json({message: 'Appeal was deleted successfully'})
}

module.exports = {
    writeAppeal,
    getAllAppeals,
    deleteAppeal
}