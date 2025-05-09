const Order = require('../module/Order');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
module.exports.createOrder = asyncHandler(async (req, res) => {
    const token = await req.headers.authorization.split(' ')[1];
          if (!token){res.status(404).json({message:'No token provided'})}
          const decoded = await jwt.verify(token,process.env.SECRET_JWT)
  const {  products, total } = req.body;
        

  const order = await Order.create({
    user:decoded.id,
    products,
    total,
  });

  // إرسال إشعار باستخدام WebSocket أو Socket.IO (هنضيفه تحت)
  req.io.emit('newOrder', order);

  res.status(201).json({ message: 'Order created', order });
});

// عرض كل الأوردرات
module.exports.getAllOrders = asyncHandler(async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching orders', error: err.message });
    }
  });
  
  // تعديل حالة الأوردر
  module.exports.updateOrderStatus = asyncHandler(async (req, res) => {
    try {
      const { status } = req.body;
      const order = await Order.findById(req.params.id);
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      order.status = status; // تحديث حالة الأوردر
      const updatedOrder = await order.save(); // حفظ التحديثات
  
      // إرسال إشعار للفرونت
      req.io.emit('orderStatusUpdated', updatedOrder);
  
      res.status(200).json({ message: 'Order status updated', order: updatedOrder });
    } catch (err) {
      res.status(500).json({ message: 'Error updating order status', error: err.message });
    }
  });
  
  // عرض أوردرات المستخدم
  module.exports.getUserOrders = asyncHandler(async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1]; // استخراج التوكن
      if (!token) {
        return res.status(404).json({ message: 'No token provided' });
      }
  
      const decoded = jwt.verify(token, process.env.SECRET_JWT); // فك تشفير التوكن
      const userOrders = await Order.find({ user: decoded.id }); // البحث عن أوردرات المستخدم
  
      if (!userOrders) {
        return res.status(404).json({ message: 'No orders found for this user' });
      }
  
      res.status(200).json(userOrders);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user orders', error: err.message });
    }
  });