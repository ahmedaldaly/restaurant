'use client'
import axios from 'axios'
import { useLocale } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../BaseUrl'

interface product {
  _id: string
  title: string
  category: string
  description: string
  descriptionAr: string
  images: {
    url: string
  }[]
}

const Product = () => {
  const locale = useLocale()
  const Arabic = locale === 'ar'
  const [products, setProducts] = useState<product[]>([])

  useEffect(() => {
    axios.get(`${BaseUrl}/api/v1/product`)
      .then((res) => {
        setProducts(res.data.slice(0, 4)) // نعرض أول 4 منتجات فقط
      })
  }, [])

  return (
    <div className="px-6 md:px-16 py-20">
      <h1 className='py-10 text-center text-5xl font-bold'>
        {Arabic ? 'الرائج في القائمة' : 'Explore Our Menu'}
      </h1>
      <div className='flex w-full justify-center gap-5 items-center mb-10'>
        <hr className='w-20 border-pink-500' />
        <img className='w-10' src="/spoon.svg" alt="spoon" />
        <hr className='w-20 border-pink-500' />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {products.map((item) => (
          <div
            key={item._id}
            className='bg-white/30 backdrop-blur-md rounded-2xl p-5 shadow-md border border-white/60 transition-all hover:scale-105'
          >
            <div className='bg-white/50 rounded-xl p-4 h-48 flex items-center justify-center mb-4'>
              <img
                src={item.images?.[0]?.url || '/placeholder.png'}
                alt={item.title}
                className='max-h-32 object-contain hover:rotate-12 duration-300'
              />
            </div>

            <h3 className='text-xl font-bold text-gray-800 dark:text-white'>
              {item.title}
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-300 mb-4'>
              {Arabic ? item.descriptionAr : item.description}
            </p>

            <div className='flex justify-between items-center mt-auto'>
              <span className='text-lg font-bold text-rose-600'>
                ${Math.floor(Math.random() * 10) + 10}.00
              </span>
              <button className='bg-gradient-to-r from-pink-500 to-rose-400 text-white px-4 py-1 rounded-lg text-sm shadow-md hover:opacity-90 transition'>
                {Arabic ? 'أضف للسلة' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
        <button className='bg-gradient-to-r from-pink-500 cursor-pointer to-rose-400 text-white font-semibold px-6 py-3 rounded-lg shadow-[0_4px_20px_rgba(249,115,129,0.4)] hover:brightness-105 transition my-10'>{Arabic?'جميع المنتجات':'All Product'}</button>
    </div>
  )
}

export default Product
