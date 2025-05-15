'use client'
import React from 'react'
import { useLocale } from 'next-intl'
import { useForm } from 'react-hook-form'
import PageWrapper from '@/components/PageWrapper'

type FormData = {
  name: string
  email: string
  message: string
}

const ContactPage = () => {
  const locale = useLocale()
  const Arabic = locale === 'ar'

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    const subject = encodeURIComponent(Arabic ? 'رسالة من صفحة تواصل معنا' : 'Contact Form Message')
    const body = encodeURIComponent(
      `${Arabic ? 'الاسم' : 'Name'}: ${data.name}\n` +
      `${Arabic ? 'البريد الإلكتروني' : 'Email'}: ${data.email}\n\n` +
      `${Arabic ? 'الرسالة' : 'Message'}:\n${data.message}`
    )
    
    
   window.open(`mailto:mariamstore640@gmail.com?subject=${subject}&body=${body}`)

  }

  return (
    <PageWrapper>

    <div className="max-w-3xl mx-auto px-6 py-12 bg-white/60 dark:bg-black/70 backdrop-blur-md rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {Arabic ? 'تواصل معنا' : 'Contact Us'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {Arabic ? 'الاسم' : 'Name'}
          </label>
          <input
            type="text"
            {...register('name', { required: true })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/10 dark:text-white`}
            placeholder={Arabic ? 'ادخل اسمك' : 'Enter your name'}
          />
          {errors.name && <p className="mt-1 text-red-600 text-sm">{Arabic ? 'الاسم مطلوب' : 'Name is required'}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {Arabic ? 'البريد الإلكتروني' : 'Email'}
          </label>
          <input
            type="email"
            {...register('email', { required: true })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/10 dark:text-white`}
            placeholder={Arabic ? 'ادخل بريدك الإلكتروني' : 'Enter your email'}
          />
          {errors.email && <p className="mt-1 text-red-600 text-sm">{Arabic ? 'البريد مطلوب' : 'Email is required'}</p>}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {Arabic ? 'الرسالة' : 'Message'}
          </label>
          <textarea
            rows={5}
            {...register('message', { required: true })}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white/10 dark:text-white resize-none`}
            placeholder={Arabic ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
          ></textarea>
          {errors.message && <p className="mt-1 text-red-600 text-sm">{Arabic ? 'الرسالة مطلوبة' : 'Message is required'}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition"
        >
          {Arabic ? 'إرسال' : 'Send'}
        </button>
      </form>
    </div>
    </PageWrapper>
  )
}

export default ContactPage
