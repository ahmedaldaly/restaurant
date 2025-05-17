'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { BaseUrl } from './BaseUrl';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('userToken');

const socket = io(`${BaseUrl}`, {
  auth: {
    token,
  },
  transports: ['websocket'], // تأكد من هذا أيضًا
});

interface User {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

const OrdersListener = () => {
  const [user, setUser] = useState<User | null>(null);
  const token = Cookies.get('userToken');

  useEffect(() => {
    if (!token) return;

    axios.get(`${BaseUrl}/api/v1/user`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setUser(res.data);
    }).catch(err => {
      console.error("فشل في جلب بيانات المستخدم", err);
    });

    const audio = new Audio('/aut.m4a'); // من مجلد public

    socket.on('newOrder', (order) => {
      // ✅ عرض الإشعار فقط إذا كان المستخدم أدمن
      if (user?.isAdmin) {
        toast.success(`🔥 أوردر جديد: رقم ${order.id || 'غير محدد'}`, {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        audio.play().catch((err) => {
          console.warn('🔇 فشل تشغيل الصوت:', err);
        });
      }
    });

    return () => {
      socket.off('newOrder');
    };
  }, [token, user]); // مهم تمرير `user` علشان يتحدث عند التغيير

  return <ToastContainer />;
};

export default OrdersListener;
