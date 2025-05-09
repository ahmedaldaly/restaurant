
const express = require('express');
const {addBooking,getBooking,getUserBooking,deleteBooking,editBooking } = require('../controller/bookingController');
const { authAndAdmin, auth } = require('../middelware/authrazition');
const router = express.Router();

// راوت لإنشاء الأوردر
router.post('/', addBooking);

// راوت لعرض كل الأوردرات
router.get('/', authAndAdmin,getBooking);
router.get('/user', getUserBooking); 
router.delete('/:id', auth,deleteBooking); 
router.put('/:id', authAndAdmin,editBooking); 



module.exports = router;
