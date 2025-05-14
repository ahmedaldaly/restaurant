import { BaseUrl } from '@/components/BaseUrl'
import Hero from '@/components/Home/Hero'
import TopProduct from '@/components/Home/Category';
import React from 'react'
const page = async() => {

  return (
    <div className=' w-full min-h-[120vh] overflow-hidden  dark:bg-black/90'>
      <Hero/>

      <TopProduct/>
    </div>
  )
}

export default page
