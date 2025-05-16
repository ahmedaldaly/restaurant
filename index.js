const express = require('express');
const http = require('http'); // مهم لإنشاء السيرفر
const { Server } = require('socket.io');
const dotenv = require('dotenv').config();
const ConnectDB = require('./config/ConnectDB');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss');

const app = express();
const server = http.createServer(app); // استخدام http بدلاً من app.listen مباشرة

// تحديد الحد: مثلاً 100 طلب في الدقيقة
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 دقيقة
  max: 100, // عدد الطلبات المسموح بها
  message: 'لقد تجاوزت الحد المسموح للطلبات، حاول لاحقًا.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware لتنظيف بيانات الطلب (Body و Query) من XSS
const sanitizeRequest = (req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    }
  }

  if (req.query) {
    for (const key in req.query) {
      if (typeof req.query[key] === 'string') {
        req.query[key] = xss(req.query[key]);
      }
    }
  }

  next();
};

// ترتيب الميدل ويرز مهم جداً:
app.use(express.json({ limit: '10kb' }));  // قراءة بيانات JSON بحجم محدود
app.use(sanitizeRequest);                  // تنظيف البيانات من هجمات XSS
app.use(helmet());                         // أمان HTTP headers
app.use(cors({
  origin: '*',
  credentials: true, // هنا لازم تحذر لأن السماح بالكوكيز مع origin = '*' غير مسموح غالباً، فتقدر تلغي credentials لو مش محتاجها
}));;
app.use(limiter);                          // تحديد عدد الطلبات (Rate Limiting)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});
app.use((req, res, next) => {
  req.io = io;
  next();
});

// اتصال بقاعدة البيانات
ConnectDB();

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello' });
});
app.use('/api/v1/auth', require('./router/auth'));
app.use('/api/v1/category', require('./router/category'));
app.use('/api/v1/product', require('./router/product'));
app.use('/api/v1/orders', require('./router/order'));
app.use('/api/v1/image', require('./router/image'));
app.use('/api/v1/booking', require('./router/booking'));
app.use('/api/v1/user', require('./router/user'));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
