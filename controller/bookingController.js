const Booking = require('../module/Booking');
const {User} = require('../module/User')
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
module.exports.addBooking = asyncHandler(async (req, res) => {
    try {
        const token = await req.headers.authorization.split(' ')[1];
        if (!token) { res.status(404).json({ message: 'No token provided' }) }
        const decoded = await jwt.verify(token, process.env.SECRET_JWT);
        const check = await Booking.findOne({user:decoded.id, bookingIn:req.body.bookingIn})
        if(check){
            res.status(400).json({message:'The reservation is already in place.'})
        }
        const newBooking = new Booking ({
            user:decoded.id,
            bookingIn:req.body.bookingIn
        })
        const save = await newBooking.save()
        res.status(201).json(save)
    } catch (err) { res.status(500).json(err) }
})

module.exports.getBooking = asyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email');

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    const result = bookings.map(booking => ({
      _id: booking._id,
      email: booking.user.email,
      phone: booking.user.phone,
      address: booking.user.address,
      name: booking.user.name,
      bookingIn: booking.bookingIn // أو booking.bookingIn لو دا اسم الحقل عندك
    }));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
module.exports.getUserBooking =asyncHandler(async(req,res)=>{
    try{
         const token = await req.headers.authorization.split(' ')[1];
        if (!token) { res.status(404).json({ message: 'No token provided' }) }
        const decoded = await jwt.verify(token, process.env.SECRET_JWT);
        const find = await Booking.find({user:decoded.id})
        if(!find){res.status(404).json({mesasage:'The user has no reservations.'})}
        res.status(200).json(find)
    }catch(err){res.status(500).json(err)}
})
module.exports.deleteBooking =asyncHandler (async(req,res)=>{
    try{
        const find = await Booking.findById(req.params.id)
        if(!find){res.status(404).json({message:'not found'})}
        await Booking.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'success'})
    }catch(err){res.status(500).json(err)}
})
module.exports.editBooking = asyncHandler (async(req , res)=>{
    try{
        const find = await Booking.findById(req.params.id)
        if(!find){res.status(404).json({message:'not found'})}
        const edit = await Booking.findByIdAndUpdate(req.params.id,{
            status:req.body.status
        },{new:true})
        res.status(200).json(edit) 
    }catch(err){res.status(500).json(err)}
})