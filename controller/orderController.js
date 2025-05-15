const Order = require('../module/Order');
const Product = require('../module/Product');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const {User} = require('../module/User')
// ✅ إنشاء أوردر (منتج واحد فقط)
module.exports.createOrder = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.SECRET_JWT);

  const { product: productId, size = 'lg', quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'Product is required' });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: `Product not found: ${productId}` });
  }

  const sizeInfo = product.sizes.find((s) => s.size === size);
  if (!sizeInfo) {
    return res.status(400).json({ message: `Size '${size}' not found for product ${product.title}` });
  }

  const total = sizeInfo.price * quantity;

  const order = await Order.create({
    user: decoded.id,
    product: productId,
    size,
    quantity,
    total,
  });

  req.io.emit('newOrder', order);
  res.status(201).json(order);
});

// ✅ عرض كل الأوردرات
module.exports.getAllOrders = asyncHandler(async (req, res) => {
  try {
    // Get all orders with populated user and product data
    const orders = await Order.find()
      .populate('user')
      .populate('product');
    
    // Format each order
    const formattedOrders = orders.map(order => ({
      _id: order._id,
      user: order.user?.name, // Using optional chaining in case user is null
      size: order.size,
      quantity: order.quantity,
      total: order.total,
      status: order.status,
      images: order.product?.images, // Optional chaining for product
      title: order.product?.title
    }));
    
    res.status(200).json(formattedOrders);
  } catch(err) {
    res.status(500).json({ 
      message: 'Error fetching orders',
      error: err.message 
    });
  }
});
// ✅ حذف أوردر
module.exports.removeOrder = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.SECRET_JWT);

  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  if (order.user.toString() !== decoded.id) {
    return res.status(403).json({ message: 'Unauthorized to delete this order' });
  }

  await order.deleteOne();
  res.status(200).json({ message: 'Order deleted successfully' });
});

// ✅ تحديث حالة الأوردر
module.exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = status;
  const updatedOrder = await order.save();
  req.io.emit('orderStatusUpdated', updatedOrder);
  res.status(200).json({ message: 'Order status updated', order: updatedOrder });
});

// ✅ عرض أوردرات مستخدم - معدل ومحسن
module.exports.getUserOrders = asyncHandler(async (req, res) => {
  try {
    // التحقق من التوكن
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // فك تشفير التوكن
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_JWT);

    // جلب الطلبات مع البيانات المرتبطة
    const userOrders = await Order.find({ user: decoded.id })
      .populate('user', 'name email') // فقط الحقول المطلوبة من المستخدم
      .populate('product', 'title images price'); // فقط الحقول المطلوبة من المنتج

    // تنسيق البيانات قبل الإرسال
    const formattedOrders = userOrders.map(order => ({
      _id: order._id,
      user: {
        name: order.user?.name,
        email: order.user?.email
      },
      product: {
        title: order.product?.title,
        images: order.product?.images,
        price: order.product?.price
      },
      quantity: order.quantity,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt
    }));

    res.status(200).json(
      formattedOrders
    );

  } catch (err) {
    // معالجة الأخطاء بشكل أفضل
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: err.message 
    });
  }
});