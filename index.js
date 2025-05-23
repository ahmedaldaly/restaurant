const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
require('./middelware/validateEnv'); // ✅ تحقق من env
const ConnectDB = require('./config/ConnectDB');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const server = http.createServer(app);

// ✅ Rate limiter للـ login/signup
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'عدد المحاولات لتسجيل الدخول أو التسجيل تجاوز الحد المسموح. الرجاء المحاولة لاحقًا.',
  standardHeaders: true,
  legacyHeaders: false,
});

// ✅ Rate limiter عام
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: 'لقد تجاوزت الحد المسموح للطلبات، حاول لاحقًا.',
  standardHeaders: true,
  legacyHeaders: false,
});

// ✅ إعادة توجيه HTTP إلى HTTPS (في الإنتاج فقط)
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
      next();
    } else {
      res.redirect(`https://${req.headers.host}${req.url}`);
    }
  } else {
    next();
  }
});

// ✅ Middlewares
app.use(express.json({ limit: '10kb' }));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  }
}));

app.use(cors({
  origin:"https://restaurant-front-iota.vercel.app",
  credentials: true,
}));

// ✅ تنظيف البيانات من NoSQL Injection
const preventNoSQLInjection = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      preventNoSQLInjection(obj[key]);
    }
    if (key.includes('$') || key.includes('.')) {
      delete obj[key];
    }
  }
};

app.use((req, res, next) => {
  if (req.body) preventNoSQLInjection(req.body);
  if (req.query) preventNoSQLInjection(req.query);
  if (req.params) preventNoSQLInjection(req.params);
  next();
});

// ✅ تنظيف من XSS
const sanitizeXSS = (value) => {
  if (typeof value === 'string') {
    return value.replace(/<.*?>/g, '');
  } else if (typeof value === 'object' && value !== null) {
    for (const key in value) {
      value[key] = sanitizeXSS(value[key]);
    }
  }
  return value;
};

app.use((req, res, next) => {
  req.body = sanitizeXSS(req.body);
  req.query = sanitizeXSS(req.query);
  req.params = sanitizeXSS(req.params);
  next();
});

// ✅ Socket.io إعداد
const io = new Server(server, {
  cors: {
    origin: "https://restaurant-front-iota.vercel.app",
    methods: ['GET', 'POST'],
  }
});

// ✅ Socket.io JWT authentication
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token || socket.handshake.query.token;
    if (!token) return next(new Error('Authentication error: Token not provided'));

    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    socket.user = decoded;
    next();
  } catch (err) {
    console.error('Socket auth failed:', err.message);
    return next(new Error('Authentication error'));
  }
});

// تمرير socket.io لكل الطلبات
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ اتصال قاعدة البيانات
ConnectDB();

// ✅ Routes
app.get('/', (req, res) => res.status(200).json({ message: 'hello' }));
app.use('/api/v1/auth', authLimiter, require('./router/auth'));
app.use('/api/v1/category', require('./router/category'));
app.use('/api/v1/product', require('./router/product'));
app.use('/api/v1/orders', require('./router/order'));
app.use('/api/v1/image', require('./router/image'));
app.use('/api/v1/booking', require('./router/booking'));
app.use('/api/v1/user', require('./router/user'));

// ✅ Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'حدث خطأ في السيرفر، الرجاء المحاولة لاحقًا.' : err.message;
  res.status(statusCode).json({ success: false, error: message });
});

// ✅ تشغيل السيرفر
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
