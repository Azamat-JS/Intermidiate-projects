const Car = require("../models/Car");

const getAllCars = async (req, res) => {
  const { model, sort, numericFilters, fields } = req.query;
  const queryObject = {};

  if (model) {
    queryObject.model = { $regex: model, $options: "i" };
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

  let result = Car.find(queryObject).populate("author_info", "model")
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
  const limit = Number(req.query.limit) || 6
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)
  const cars = await result;
  res.status(200).json({ cars, count: cars.length });
};

const getSingleCar = async(req, res) => {
  const {id:carId} = req.params
  const comment = await Comment.find({car:carId})
  const car = await Car.findOne({_id:carId}).populate("author_info", "model")
  res.status(200).json({message: "Car found", car})
}

const createCar = async(req, res) =>{
  const car = await Car.create({...req.body})
  res.status(201).json({
    msg: "Car added successfully",
    car})
}

const updateCar = async(req, res) => {
  const {id} = req.params
  const car = await Car.findByIdAndUpdate({_id:id}, req.body,
    {new:true, runValidators:true}
  )
  res.status(201).json({
    msg: "Car updated successfully",
    car})
}

const deleteCar = async(req, res) => {
  const {id} = req.params
  const car = await Car.findByIdAndDelete(id)
  res.status(200).send('Car deleted successfully')
}


module.exports = {
  getAllCars,
  getSingleCar,
  createCar,
  updateCar,
  deleteCar
};

