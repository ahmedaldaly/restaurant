'use client'
import React, { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { IoIosArrowForward } from "react-icons/io";

const page = () => {
  const [product, setProduct] = useState([]);
  useEffect(()=>{},[])
    const locale = useLocale()
    const Arabic = locale ==='ar'
  return (
    <div>
        <section className='w-full h-[45vh] relative bg-white/60 bg-no-repeat bg-[length:100%_200px] bg-bottom bg-[url(/bgmenu.png)] '>
        <div className='w-full absolute h-full top-0 left-0 bg-white/50 backdrop-blur-sm flex justify-center items-center'>
        <div>
         <h1 className='text-4xl font-bold'>{Arabic?"قائمتنا":"Our Menu"}</h1>
        <p className='flex justify-center items-center gap-2'><Link href='/'>{Arabic?'الرئسية':'Home'}</Link><IoIosArrowForward/> Menu</p>
        </div>
        </div>
        </section>
        {/*  */}
        
    </div>
  )
}

export default page