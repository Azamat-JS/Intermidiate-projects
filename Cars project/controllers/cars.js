const BaseError = require("../errors/base_error");
const Car = require("../models/Car");
const FileService = require('../upload/upload_file')

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
    const options = ["price", "year", "engine"];
    filters = filters.split(",").forEach((item) => {
      const [field, key, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [key]: Number(value) };
      }
    });
  }

  let result = Car.find(queryObject).populate("category", "brand");
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const cars = await result;
  res.status(200).json({ cars, count: cars.length });
};

const getSingleCar = async (req, res) => {
  const { id: carId } = req.params;
  const car = await Car.findOne({ _id: carId }).populate(
    "category",
    "-_id, brand"
  );
  if(!car){
    throw BaseError.NotFoundError(`There is no car with id ${carId}`)
  }
  const carWithImages = {
    ...car._doc,
    model_photo: `data:${car.model_photo.contentType};base64,${car.model_photo.data.toString('base64')}`,
    external_photo: `data:${car.external_photo.contentType};base64,${car.external_photo.data.toString('base64')}`,
    inner_photo: `data:${car.inner_photo.contentType};base64,${car.inner_photo.data.toString('base64')}`,
  };

  res.status(200).json(carWithImages);
};

const addCar = async (req, res) => {
  try {
    const {
      model,
      price,
      engine,
      year,
      category,
      distance,
      tinting,
      color,
      description,
    } = req.body;

    const { model_photo, external_photo, inner_photo } = req.files;

    const car = await Car.create({
      model,
      price,
      engine,
      year,
      color,
      distance,
      description,
      tinting,
      category,
      model_photo: {
        data: model_photo[0].buffer,
        contentType: model_photo[0].mimetype,
      },
      external_photo: {
        data: external_photo[0].buffer,
        contentType: external_photo[0].mimetype,
      },
      inner_photo: {
        data: inner_photo[0].buffer,
        contentType: inner_photo[0].mimetype,
      },
    });

    res.status(201).json({
      msg: 'Car added successfully',
      car,
    });
  } catch (err) {
    res.status(500).json({
      msg: 'Error adding car',
      error: err.message,
    });
  }
};


const updateCar = async (req, res) => {
  const { id } = req.params;
  const car = await Car.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!car) {
    throw BaseError.NotFoundError("There is no car with id:" + id);
  }
  res.status(201).json({
    msg: "Car updated successfully",
    car: car,
  });
};

const deleteCar = async (req, res) => {
  const { id } = req.params;
  await Car.findByIdAndDelete(id);
  res.status(200).send("Car deleted successfully");
};

module.exports = {
  getAllCars,
  getSingleCar,
  addCar,
  updateCar,
  deleteCar,
};
