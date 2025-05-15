'use client'

import { useLocale } from 'next-intl'
import Hero from '@/components/Home/Hero'
import Category from '@/components/Home/Category'
import { FaShoppingCart, FaUtensils, FaTruck } from 'react-icons/fa'
import About from '@/components/Home/About'
import Product from '@/components/Home/Product'
import Images from '@/components/Home/Images'
import OrdersListener from '@/components/OrderListener'

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
  <div
      className="w-full h-screen bg-cover bg-center relative flex items-center"
      style={{
        backgroundImage: "url('/bgg.jpg')",
      }}
    >
      {/* Overlay for dark background */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Text content */}
      <div
        className={`relative z-10 max-w-3xl px-8 md:px-16 text-white ${
          Arabic ? 'text-right ml-auto' : 'text-left'
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-snug">
          {Arabic
            ? 'الطعام ليس مجرد طاقة. إنه تجربة.'
            : 'Food is not just eating energy. It’s an experience.'}
        </h1>

        <p className="text-sm md:text-base text-gray-200 mb-4 leading-relaxed">
          {Arabic
            ? 'في مطعمنا، يتم إعداد كل طبق بشغف، حيث نمزج النكهات التي تُثير براعم التذوق لديك وتترك انطباعًا لا يُنسى. نؤمن أن الوجبة يجب أن تكون أكثر من مجرد غذاء؛ بل يجب أن تكون رحلة تُحفّز كل حواسك، من الرائحة الأولى وحتى آخر لقمة.'
            : 'At our restaurant, every dish is crafted with passion, blending flavors that excite your taste buds and leave a lasting impression. We believe that a meal should be more than just sustenance; it should be a journey that engages all your senses, from the first aroma to the final bite.'}
        </p>

        <p className="text-sm md:text-base text-gray-200 mb-8 leading-relaxed">
          {Arabic
            ? 'سواء كنت تبحث عن طبق كلاسيكي مريح أو تستكشف شيئًا جديدًا، فإن أطباقنا مصممة لخلق لحظات لا تُنسى.'
            : 'Whether you’re savoring a comforting classic or exploring something new, our dishes are designed to create memorable moments.'}
        </p>

       
      </div>
    </div>
    {/*  */}
    <Images/>
    <OrdersListener/>
    </div>
  )
}

export default Page
