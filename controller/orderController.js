const Order = require('../module/Order');
const Product = require('../module/Product');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// ✅ إنشاء أوردر
module.exports.createOrder = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.SECRET_JWT);

  const { products } = req.body;
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'No products provided' });
  }

  let total = 0;
  const updatedProducts = [];

  for (const item of products) {
    const { product: productId, size, quantity } = item;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: `Product not found: ${productId}` });
    }

    const sizeInfo = product.sizes.find((s) => s.size === size);
    if (!sizeInfo) {
      return res.status(400).json({ message: `Size '${size}' not found for product ${product.title}` });
    }

    const itemPrice = sizeInfo.price;
    const itemTotal = itemPrice * quantity;
    total += itemTotal;

    updatedProducts.push({
      product: productId,
      size,
      quantity,
      price: itemPrice,
    });
  }

  const order = await Order.create({
    user: decoded.id,
    products: updatedProducts,
    total,
  });

  req.io.emit('newOrder', order);

  res.status(201).json({ message: 'Order created', order });
});

// ✅ عرض كل الأوردرات
module.exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
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

  await order.deleteOne(); // 🟢 حذف الأوردر بشكل صحيح
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

// ✅ عرض أوردرات مستخدم
module.exports.getUserOrders = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.SECRET_JWT);

  const userOrders = await Order.find({ user: decoded.id });
  res.status(200).json(userOrders);
});
