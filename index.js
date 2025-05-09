const express = require('express');
const http = require('http'); // مهم لإنشاء السيرفر
const { Server } = require('socket.io');
const dotenv = require('dotenv').config();
const ConnectDB = require('./config/ConnectDB');

const app = express();
const server = http.createServer(app); // استخدام http بدلاً من app.listen مباشرة

const io = new Server(server, {
  cors: {
    origin: '*', // لو الفرونت على دومين مختلف غير الباك
    methods: ['GET', 'POST']
  }
});

// تخزين الـ socket.io في كل request
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());
ConnectDB();

// الراوترات
app.use('/api/v1/auth', require('./router/auth'));
app.use('/api/v1/category', require('./router/category'));
app.use('/api/v1/product', require('./router/product'));
app.use('/api/v1/orders', require('./router/order')); // لا تنسَ تعمل راوتر الأوردر
app.use('/api/v1/image', require('./router/image')); 
app.use('/api/v1/booking', require('./router/booking')); 

// الاتصال بالسوكت
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
