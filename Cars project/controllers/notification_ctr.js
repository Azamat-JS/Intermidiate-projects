const notification = require('../models/notification');
const Notification = require('../models/notification')

const getAllNotifications = async (req, res) => {
  const notifications = await Notification.find();
  res.status(200).json(notifications);
};

const getOneNotification = async(req, res) => {
  const {notification} = req.params
  const notification1 = await Notification.findByFullName(notification)
  res.status(200).json(notification1)
}

const addNotification = async (req, res) => {
  const notification = await Notification.create();
  res.status(201).json({
    msg: "Notification added successfully",
    notification});
};

const updateNotification = async (req, res) => {
  const {id} = req.params
  const notification = await Notification.findByIdAndUpdate({_id: id}, req.body,
    {new:true, runValidators:true}
  )
  res.status(200).json({
    msg: "Notification updated successfully",
    notification})
}

const deleteNotification = async (req, res) => {
  const {id} = req.params
    await Notification.findByIdAndDelete({_id: id})
  res.status(200).json({msg:"Notification deleted successfully"})
}


module.exports = {
  getAllNotifications,
  addNotification,
  getOneNotification,
  updateNotification,
  deleteNotification
};