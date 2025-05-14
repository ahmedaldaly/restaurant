'use client'

import { useLocale } from 'next-intl'
import Hero from '@/components/Home/Hero'
import Category from '@/components/Home/Category'
import { FaShoppingCart, FaUtensils, FaTruck } from 'react-icons/fa'
import About from '@/components/Home/About'
import Product from '@/components/Home/Product'

const Page = () => {
  const locale = useLocale()
  const Arabic = locale === 'ar'

  return (
    <div className='w-full min-h-[120vh] overflow-hidden dark:bg-black/90'>
      <Hero />
      <Category />
      {/*  */}
<About/>
<Product/>
    </div>
  )
}

export default Page
