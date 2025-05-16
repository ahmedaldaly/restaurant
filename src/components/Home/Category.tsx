'use client'
import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import axios from 'axios'
import { BaseUrl } from '../BaseUrl'
import { FaLongArrowAltRight } from "react-icons/fa";
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion' // ✅ إضافة framer-motion
interface Category {
  _id: string
  name: string
  image: {
    url: string
  }
}

const TopProduct = () => {
  const [category, setCategory] = useState<Category[]>([])

  useEffect(() => {
    axios.get(`${BaseUrl}/api/v1/category`)
      .then((data) => setCategory(data.data))
  }, [])

 const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  swipe: true,
  touchMove: true,
  draggable: true,
  centerMode: false,
  variableWidth: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}
const locale = useLocale()
const Arabic = locale ==='ar'
  return (
    <div className="py-10">
      <h1 className='py-10 text-center text-5xl font-bold'>{Arabic?'الفئات الشعبية':'Popular Categories'}</h1>
      <div className='flex w-ful justify-center gap-5 items-center'>
        <hr className='w-20 text-pink-700'/>
        <img className='w-10' src="/spoon.svg" alt="" />
        <hr className='w-20 text-pink-700'/>
      </div>
      <Slider {...settings} className="w-[90%] mx-auto mt-5">
        {category.map((item , i) => (
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: i * 0.2 }}
  key={item._id}
  className="px-4"
>
  <div className="relative flex flex-col items-center">
    <div className="w-28 h-28 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center z-10 mb-[-40px] transition-transform duration-500 hover:scale-110 hover:rotate-180">
      <img
        src={item.image.url}
        alt={item.name}
        className="w-20 h-20 object-contain"
      />
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg pt-16 pb-6 px-6 text-center w-full">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{item.name}</h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
        {Arabic ? "تصفح أفضل الأطباق" : "Explore top dishes"}
      </p>
      <Link href={`/menu?category=${encodeURIComponent(item.name)}`}>
        <button className="mt-4 inline-flex items-center gap-2 text-sm text-rose-500 dark:text-rose-400 font-medium hover:underline">
          {Arabic ? 'اطلب الآن' : 'Order Now'} 
          <span className="hover:translate-x-1 transition-transform duration-200">
            <FaLongArrowAltRight />
          </span>
        </button>
      </Link>
    </div>
  </div>
</motion.div>

        ))}
      </Slider>
    </div>
  )
}

export default TopProduct
