// في ملف `orderRouter.js`
const express = require('express');
const { createOrder, getAllOrders, updateOrderStatus, getUserOrders } = require('../controller/orderController');
const router = express.Router();

// راوت لإنشاء الأوردر
router.post('/', createOrder);

// راوت لعرض كل الأوردرات
router.get('/', getAllOrders);

// راوت لتعديل حالة الأوردر
router.put('/:id', updateOrderStatus);

// راوت لعرض أوردرات المستخدم
router.get('/user-orders', getUserOrders);

module.exports = router;
