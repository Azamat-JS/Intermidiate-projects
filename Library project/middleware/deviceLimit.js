const Auth = require('../models/auth')
const DeviceDetector = require('node-device-detector')
const detectDevice = require('../utils/deviceDetector')
const BaseError = require('../errors/base_error')


const deviceLimitMiddleware = async(req, res, next) => {
    try {
        if(!req.user){
            throw BaseError.UnauthorizedError('Unauthorized') 
        }

        const user = await Auth.findById(req.user.userId)
        if(!user){
            throw BaseError.BadRequestError('User not fount')
        }

        const deviceId = detectDevice(req)
        if(!deviceId){
            throw BaseError.BadRequestError('Could not detect device')
        }

        if(!user.devices.includes(deviceId)){
            return res.status(403).json({message: "Acces denied: Unregistered device"})
        }

        next()
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const detector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAliasCode: false,
  });

  const detectData = (req, res, next) => {
    const userInfo = req.headers['user-agent']
    if(!userInfo){
        throw BaseError.BadRequestError('User Agent header missing')
    }

    const result = detector.detect(userInfo)
    console.log({device: result});
    next()
  }

module.exports = {deviceLimitMiddleware, detectData}