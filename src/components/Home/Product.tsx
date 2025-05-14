'use client'
import axios from 'axios'
import { useLocale } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../BaseUrl'
interface product {
    _id:string
    title:string
    
}
const Product = () => {
    const locale =useLocale()
    const Arabic = locale ==='ar'
    const [product, setProduct] = useState([])
    useEffect(()=>{
        axios.get(`${BaseUrl}/api/v1/product`)
        .then((data)=>{
            console.log(data.data)
            setProduct(data.data)
        })
    },[])
  return (
    <div>
              <h1 className='py-10 text-center text-5xl font-bold'>{Arabic?' الرائج في القائمة':' Explore Our Menu'}</h1>
      <div className='flex w-ful justify-center gap-5 items-center'>
        <hr className='w-20 text-pink-700'/>
        <img className='w-10' src="/spoon.svg" alt="" />
        <hr className='w-20 text-pink-700'/>
      </div>
      {/*  */}
    </div>
  )
}

export default Product