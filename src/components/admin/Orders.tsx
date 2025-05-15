'use client'
import { BaseUrl } from '@/components/BaseUrl';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useLocale } from 'next-intl';

interface Booking {
  _id: string;
  bookingIn: Date;
  status: string;
  name: string;
}

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  product: {
    title: string;
    images: { url: string }[];
  };
  quantity: number;
  total: number;
  status: string;
  createdAt: string;
}

const Page = () => {
  const token = Cookies.get('userToken');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const locale = useLocale();
  const Arabic = locale === 'ar';

  useEffect(() => {
    axios.get(`${BaseUrl}/api/v1/booking`, {
      headers: { authorization: `Bearer ${token}` }
    }).then(res => setBookings(res.data));

    axios.get(`${BaseUrl}/api/v1/orders/user-orders`, {
      headers: { authorization: `Bearer ${token}` }
    }).then(res => setOrders(res.data));
  }, []);

  const deleteBooking = (id: string) => {
    axios.delete(`${BaseUrl}/api/v1/booking/${id}`, {
      headers: { authorization: `Bearer ${token}` }
    }).then(() => {
      setBookings(prev => prev.filter(b => b._id !== id));
    });
  };

  const updateBookingStatus = (id: string, status: string) => {
    axios.put(`${BaseUrl}/api/v1/booking/${id}`, { status }, {
      headers: { authorization: `Bearer ${token}` }
    }).then(() => {
      setBookings(prev =>
        prev.map(b => (b._id === id ? { ...b, status } : b))
      );
    }).catch((err) => {
      console.error("Failed to update booking status:", err);
    });
  };

  const deleteOrder = (id: string) => {
    axios.delete(`${BaseUrl}/api/v1/orders/${id}`, {
      headers: { authorization: `Bearer ${token}` }
    }).then(() => {
      setOrders(prev => prev.filter(o => o._id !== id));
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    axios.put(`${BaseUrl}/api/v1/orders/${id}`, { quantity }, {
      headers: { authorization: `Bearer ${token}` }
    }).then(() => {
      setOrders(prev =>
        prev.map(o => (o._id === id ? { ...o, quantity } : o))
      );
    });
  };

  const updateOrderStatus = (id: string, status: string) => {
    axios.put(`${BaseUrl}/api/v1/orders/status/${id}`, { status }, {
      headers: { authorization: `Bearer ${token}` }
    }).then(() => {
      setOrders(prev =>
        prev.map(o => (o._id === id ? { ...o, status } : o))
      );
    }).catch((err) => {
      console.error("Failed to update order status:", err);
    });
  };

  return (
    <div className="w-full min-h-screen p-4 space-y-8" dir={Arabic ? 'rtl' : 'ltr'}>
      {/* الحجوزات */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {Arabic ? 'الحجوزات' : 'Bookings'}
        </h2>
        {bookings.length === 0 ? (
          <p>{Arabic ? 'لا يوجد حجوزات' : 'No bookings found'}</p>
        ) : (
          <div className="grid gap-4">
            {bookings.map(b => (
              <div key={b._id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded flex justify-between items-center flex-wrap gap-4">
                <div>
                  <p><strong>{Arabic ? 'التاريخ' : 'Date'}:</strong> {new Date(b.bookingIn).toLocaleString()}</p>
                  <p><strong>{Arabic ? 'الحالة' : 'Status'}:</strong> {b.status}</p>
                  <p><strong>{Arabic ? 'المستخدم' : 'User'}:</strong> {b.name}</p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={b.status}
                    onChange={(e) => updateBookingStatus(b._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="pending">{Arabic ? 'قيد الانتظار' : 'Pending'}</option>
                    <option value="confirmed">{Arabic ? 'مؤكد' : 'Confirmed'}</option>
                    <option value="cancelled">{Arabic ? 'ملغي' : 'Cancelled'}</option>
                  </select>

                  <button
                    onClick={() => deleteBooking(b._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    {Arabic ? 'حذف' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* الطلبات */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {Arabic ? 'الطلبات' : 'Orders'}
        </h2>
        {orders.length === 0 ? (
          <p>{Arabic ? 'لا يوجد طلبات' : 'No orders found'}</p>
        ) : (
          <div className="grid gap-4">
            {orders.map(o => (
              <div key={o._id} className="bg-white dark:bg-gray-900 p-4 rounded shadow flex flex-col gap-2 md:flex-row md:items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={o.product.images[0]?.url} alt={o.product.title} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{o.product.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {Arabic ? 'السعر الإجمالي' : 'Total Price'}: ${o.total}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {Arabic ? ' المستخدم' : 'User '}: {o.user.name}
                    </p>
                    <p className="text-sm">
                      {Arabic ? 'الحالة' : 'Status'}: {o.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                 
                  <select
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="pending">{Arabic ? 'قيد الانتظار' : 'Pending'}</option>
                    <option value="shipped">{Arabic ? 'تم الشحن' : 'Shipped'}</option>
                    <option value="delivered">{Arabic ? 'تم التوصيل' : 'Delivered'}</option>
                    <option value="cancelled">{Arabic ? 'ملغي' : 'Cancelled'}</option>
                  </select>
                  <button
                    onClick={() => deleteOrder(o._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    {Arabic ? 'حذف' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
