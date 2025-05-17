// models/Order.js
const mongoose = require('mongoose');
const Joi = require('joi');
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    required:true
    },
    size:{
      type:String,
      default:'lg'
    },
    quantity:{
      type:Number,
      default:1
    },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

const Order =mongoose.model('Order', orderSchema);

function orderValidation(obj) {
  const schema = Joi.object({
    user: Joi.string().hex().length(24).required(),
    product: Joi.string().hex().length(24).required(),
    size: Joi.string().valid('lg', 'md', 'sm').default('lg'),
    quantity: Joi.number().integer().min(1).default(1),
    total: Joi.number().required(),
    status: Joi.string().valid('pending', 'shipped', 'delivered', 'cancelled').default('pending'),
  });
  return schema.validate(obj);
}
module.exports = {
Order ,
orderValidation
}