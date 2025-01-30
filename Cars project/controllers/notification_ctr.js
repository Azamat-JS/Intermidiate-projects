const BaseError = require('../errors/base_error');
const Notification = require('../models/notification')

const getAllNotifications = async (req, res) => {
  const notifications = await Notification.find();
  res.status(200).json(notifications);
};

const getOneNotification = async(req, res) => {
  const {id} = req.params
  const notification = await Notification.findById(id)
  res.status(200).json(notification)
}

const addNotification = async (req, res) => {
  const notification = await Notification.create(req.body);
  res.status(201).json({
    msg: "Notification added successfully",
    notification});
};

const updateNotification = async (req, res) => {
  const {params:{id: notificationId}, body: {notification}} = req;
  
  if(!notificationId || !notification){
    throw BaseError.BadRequestError('Please provide id or notification field')
  }
  const notification1 = await Notification.findByIdAndUpdate(notificationId, req.body,
    {new:true, runValidators:true}
  )
  res.status(200).json({
    msg: "Notification updated successfully",
    notification1})
}

const deleteNotification = async (req, res) => {
  const {id} = req.params
    await Notification.findByIdAndDelete(id)
  res.status(200).json({msg:"Notification deleted successfully"})
}


module.exports = {
  getAllNotifications,
  addNotification,
  getOneNotification,
  updateNotification,
  deleteNotification
};