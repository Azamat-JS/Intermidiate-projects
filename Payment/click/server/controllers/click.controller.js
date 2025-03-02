const clickService = require("../services/click.service")
const productModel = require('../models/product.model')
const userModel = require('../models/user.model')
const Order = require('../models/order.model')

class ClickController {
  async prepare(req, res, next){
    try {
        const result = await clickService.prepare(req.body)
        res.set({headers: {"Content-Type": "application/x-www-form-urlencoded: charset-UTF-8"}}).send(result)
    } catch (error) {
        next(error)
    }
  }

  async complete(req, res, next){
    try {
        const result = await clickService.complete(req.body)
        res.set({headers: {"Content-Type": "application/x-www-form-urlencoded: charset-UTF-8"}}).send(result)
    } catch (error) {
        next(error)
    }
  }

  async checkout(req, res, next){
    try {
        const currentUser = req.user
        const {productId, url} = req.body
        const MERCHANT_ID = process.env.MERCHANT_ID
        const SERVICE_ID = process.env.SERVICE_ID
        const MERCHANT_USER_ID = process.env.MERCHANT_USER_ID

        const product = await productModel.findById(productId)
        if(!product) return {failure: 'Product not found'}

        const user = await userModel.findById(currentUser._id)
        if(!user) return {failure: 'User not found'}

        await Order.deleteMany({user: user._id, product: product._id, status: 'Pending confirm', provider: 'click'})
    } catch (error) {
        next(error)
    }
  }
}

module.exports = new ClickController()