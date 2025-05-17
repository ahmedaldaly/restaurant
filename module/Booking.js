const mongoose = require('mongoose');
const Joi = require('joi')
const BookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    bookingIn:{
        type:Date,
        required:true
    },
     status: {
    type: String,
    enum: ['pending', 'processing', 'delivered', 'cancelled'],
    default: 'pending',
  }
},{timestamps:true})
const Booking = mongoose.model('Booking',BookingSchema);

function bookingValidation(obj) {
  const schema = Joi.object({
    user: Joi.string().hex().length(24).required(), // ObjectId في Mongoose بيكون 24 hex chars
    bookingIn: Joi.date().required(),
    status: Joi.string().valid('pending', 'processing', 'delivered', 'cancelled').optional(),
  });
  return schema.validate(obj);
}


module.exports = {
    Booking ,
    bookingValidation
};