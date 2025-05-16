'use client';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { BaseUrl } from './BaseUrl';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io(`${BaseUrl}`);

const OrdersListener = () => {
  useEffect(() => {
    const audio = new Audio('/aut.m4a'); // داخل مجلد public

    socket.on('newOrder', (order) => {
      console.log('📦 أوردر جديد:', order);

      // إظهار توست أنيق
      toast.success(`🔥 أوردر جديد: رقم ${order.id || 'غير محدد'}`, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // تشغيل الصوت
      audio.play().catch((err) => {
        console.warn('🔇 فشل تشغيل الصوت تلقائيًا:', err);
      });
    });

    return () => {
      socket.off('newOrder');
    };
  }, []);

  return <ToastContainer />;
};

export default OrdersListener;
