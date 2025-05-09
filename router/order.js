// في ملف `orderRouter.js`
const express = require('express');
const { auth,authAndAdmin} = require('../middelware/authrazition')
const { createOrder, getAllOrders, updateOrderStatus, getUserOrders,removeOrder } = require('../controller/orderController');
const router = express.Router();

// راوت لإنشاء الأوردر
router.post('/', createOrder);

// راوت لعرض كل الأوردرات
router.get('/',authAndAdmin, getAllOrders);

// راوت لتعديل حالة الأوردر
router.route('/:id').put( authAndAdmin,updateOrderStatus).delete(authAndAdmin,removeOrder);

// راوت لعرض أوردرات المستخدم
router.get('/user-orders', getUserOrders);

module.exports = router;
