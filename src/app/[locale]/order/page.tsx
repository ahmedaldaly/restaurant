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
    axios.get(`${BaseUrl}/api/v1/booking/user`, {
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
        console.log('done')
      setOrders(prev =>
        prev.map(o => (o._id === id ? { ...o, quantity } : o))
      );
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
              <div key={b._id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded flex justify-between items-center">
                <div>
                  <p><strong>{Arabic ? 'التاريخ' : 'Date'}:</strong> {new Date(b.bookingIn).toLocaleString()}</p>
                  <p><strong>{Arabic ? 'الحالة' : 'Status'}:</strong> {b.status}</p>
                </div>
                <button
                  onClick={() => deleteBooking(b._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  {Arabic ? 'حذف' : 'Delete'}
                </button>
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
                    <p className="text-sm">
                      {Arabic ? 'الحالة' : 'Status'}: {o.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <input
                    type="number"
                    min={1}
                    value={o.quantity}
                    onChange={(e) => updateQuantity(o._id, parseInt(e.target.value))}
                    className="border px-2 py-1 rounded w-20"
                  />
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
