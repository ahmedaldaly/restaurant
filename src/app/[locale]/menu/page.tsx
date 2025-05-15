'use client'
import React, { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { useForm } from "react-hook-form"
import Cookies from 'js-cookie'
import axios from 'axios'
import { BaseUrl } from '@/components/BaseUrl'
import toast from 'react-hot-toast'
import Images from '@/components/Home/Images'

type FormData = {
  bookingIn: string
}

interface category {
  _id: string
  name: string
}

interface product {
  _id: string
  title: string
  descriptionAr: string
  description: string
  images: {
    url: string
  }[]
  sizes: {
    size: string
    price: number
  }[]
}

const Page = () => {
  const token = Cookies.get('userToken')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [allProducts, setAllProducts] = useState<product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<product[]>([])
  const [categories, setCategories] = useState<category[]>([])
  const locale = useLocale()
  const Arabic = locale === 'ar'

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/api/v1/category`)
      setCategories(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/api/v1/product`)
      setAllProducts(res.data)
      setFilteredProducts(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const filterByCategory = async (categoryName: string) => {
    setSelectedCategory(categoryName)

    if (categoryName === 'All') {
      setFilteredProducts(allProducts)
      return
    }

    try {
      const res = await axios.get(`${BaseUrl}/api/v1/product/by-category?category=${categoryName}`)
      setFilteredProducts(res.data || [])
    } catch (err) {
      console.error(err)
      setFilteredProducts([])
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchAllProducts()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    const selectedDate = new Date(data.bookingIn)
    const now = new Date()

    if (selectedDate <= now) {
      setErrorMessage(Arabic ? 'الرجاء اختيار تاريخ صالح' : 'Please select a valid future date')
      return
    }

    setLoading(true)
    setErrorMessage('')

    axios.post(`${BaseUrl}/api/v1/booking`, {
      bookingIn: data.bookingIn
    }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        toast.success(Arabic ? 'تم الحجز، انتظر التأكيد' : 'Booking confirmed, please wait for approval')
      })
      .catch(() => {
        setErrorMessage(Arabic ? 'حدث خطأ أثناء الحجز' : 'An error occurred during booking')
      })
      .finally(() => {
        setLoading(false)
      })
  })

  return (
    <div>
      {/* حجز */}
      <section className='w-full h-[45vh] relative bg-white/60 bg-no-repeat bg-[length:100%_200px] bg-bottom bg-[url(/bgmenu.png)] '>
        <div className='w-full absolute h-full top-0 left-0 bg-white/50 dark:bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center'>
          <form onSubmit={onSubmit} className="flex items-center">
            <input
              className='w-64 h-12 bg-white/50 dark:bg-white/10 text-black dark:text-white shadow-md border border-gray-200 dark:border-gray-600 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              type='datetime-local'
              {...register("bookingIn")}
            />
            <button
              type="submit"
              disabled={loading}
              className='h-12 px-6 mx-5 bg-blue-700 text-white rounded-xl text-sm font-medium hover:bg-blue-800 transition-all'
            >
              {Arabic ? 'احجز الآن' : 'Book Now'}
            </button>
          </form>
          {errorMessage && (
            <p className="mt-4 text-red-600 text-sm">{errorMessage}</p>
          )}
        </div>
      </section>

      {/* تبويبات */}
      <div className="flex justify-center gap-3 my-6 flex-wrap">
        <button
          onClick={() => filterByCategory('All')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            selectedCategory === 'All' ? 'bg-red-500 text-white shadow-md' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {Arabic ? 'الكل' : 'All'}
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => filterByCategory(cat.name)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedCategory === cat.name ? 'bg-red-500 text-white shadow-md' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* المنتجات */}
      <section className='w-full min-h-[50vh] px-6 pb-10'>
        {filteredProducts.length === 0 ? (
          <p className='text-center text-gray-500'>
            {Arabic ? 'لا توجد منتجات لهذه الفئة' : 'No products in this category.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all">
                <div className="w-full h-40 flex items-center justify-center mb-4">
                  <img
                    src={item.images[0]?.url}
                    alt={item.title}
                    className="max-h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {Arabic ? item.descriptionAr : item.description}
                </p>
                <div className="flex items-center text-yellow-400 text-sm mb-2">
                  {'★'.repeat(5)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-pink-600">
                    ${item.sizes[0]?.price.toFixed(2)}
                  </span>
                  <button className="bg-pink-100 text-pink-600 text-sm px-4 py-1 rounded-md hover:bg-pink-200 transition">
                    {Arabic ? 'أضف للسلة' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Images/>
    </div>
  )
}

export default Page
