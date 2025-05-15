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
        {category.map((item) => (
          <div key={item._id} className="w-full px-5">
            <img
              className="w-32 h-32 object-contain mx-auto mb-[-70px] hover:rotate-180 hover:scale-105 duration-500 relative z-10"
              src={item.image.url}
              alt={item.name}
            />
            <div className="categor w-full h-52 bg-rose-400/10 rounded-3xl p-5 text-center">
              <img className="w-20 mx-auto mt-7" src="/spoon.svg" alt="spoon" />
              <h1 className="text-2xl font-bold m-2">{item.name}</h1>
              <div className="w-full flex justify-center mt-3">
                <Link href={`/menu?category=${encodeURIComponent(item.name)}`}>
  <button className="text-sm font-medium text-rose-500 cursor-pointer flex justify-between w-full">
    {Arabic ? 'اطلب الآن' : 'Order Now'} <span className='hover:scale-125 duration-200'><FaLongArrowAltRight /></span>
  </button>
</Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default TopProduct
