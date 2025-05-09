const mongoose = require('mongoose');
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
module.exports = Booking;