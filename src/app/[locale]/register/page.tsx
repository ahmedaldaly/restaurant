'use client'
import { BaseUrl } from '@/components/BaseUrl'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useLocale } from 'next-intl'
import Cookies from 'js-cookie'

type FormData = {
  name: string
  email: string
  password: string
  address: string
  phone: number
}

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const locale = useLocale()
  const Arabic = locale === 'ar'
const [loading, setLoading] = useState(false)
  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true)
      const res = await axios.post(`${BaseUrl}/api/v1/auth/register`, {
        name:data.name,
        email:data.email,
        phone:data.phone,
        address:data.address,
        password:data.password
      })
      Cookies.set('userToken',res.data.token)
      setLoading(false)
      window.location.href ='/'
    } catch (err) {
      setLoading(false)
      console.error('فشل التسجيل', err)
    }
  })

  return (
    <div className="w-full min-h-screen flex justify-center items-center   p-4" dir={Arabic ? 'rtl' : 'ltr'}>
      <form onSubmit={onSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-xl space-y-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
          {Arabic ? 'إنشاء حساب' : 'Create Account'}
        </h2>

        {/* الاسم */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            {Arabic ? 'الاسم' : 'Name'}
          </label>
          <input
            type="text"
            {...register('name', { required: Arabic ? 'الاسم مطلوب' : 'Name is required' })}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* البريد الإلكتروني */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            {Arabic ? 'البريد الإلكتروني' : 'Email'}
          </label>
          <input
            type="email"
            {...register('email', { required: Arabic ? 'البريد الإلكتروني مطلوب' : 'Email is required' })}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* كلمة المرور */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            {Arabic ? 'كلمة المرور' : 'Password'}
          </label>
          <input
            type="password"
            {...register('password', { required: Arabic ? 'كلمة المرور مطلوبة' : 'Password is required' })}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* العنوان */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            {Arabic ? 'العنوان' : 'Address'}
          </label>
          <input
            type="text"
            {...register('address', { required: Arabic ? 'العنوان مطلوب' : 'Address is required' })}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        {/* رقم الهاتف */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            {Arabic ? 'رقم الهاتف' : 'Phone Number'}
          </label>
          <input
            type="number"
            {...register('phone', { required: Arabic ? 'رقم الهاتف مطلوب' : 'Phone number is required' })}
            className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        {/* زر التسجيل */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200 font-semibold"
        >
          {loading?Arabic ? 'تحميل ....' : 'Loading ...':Arabic ? 'تسجيل' : 'Register'}
          
        </button>
      </form>
    </div>
  )
}

export default Page
