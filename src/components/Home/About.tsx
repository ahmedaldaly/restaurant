'use client'
import { useLocale } from 'next-intl'
import React from 'react'
import { FaShoppingCart, FaUtensils, FaTruck } from 'react-icons/fa'
import { motion } from 'framer-motion' 
const About = () => {
  const locale = useLocale()
  const Arabic = locale === 'ar'

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="py-10 text-center text-4xl sm:text-5xl font-bold">
        {Arabic ? 'حول' : 'About Us'}
      </h1>

      <div className="flex justify-center items-center  gap-4 mb-12">
        <hr className="w-16 border-pink-700" />
        <img className="w-10" src="/spoon.svg" alt="" />
        <hr className="w-16 border-pink-700" />
      </div>

      <section className="flex flex-col max-lg:flex-wrap justify-center md:flex-row items-center gap-12 px-4 sm:px-6 md:px-0">
        <motion.img 
        initial={{opacity:0 ,scale:0.2}}
        whileInView={{opacity:1 ,scale:1}}
        transition={{duration:0.3}}
          src="/about.png"
          alt="about"
          className="w-full md:w-[550px] rounded-3xl shadow-xl object-cover"
        />

        <motion.div
         initial={{opacity:0 ,scale:0.2}}
        whileInView={{opacity:1 ,scale:1}}
        transition={{duration:0.3}}
        className="max-w-xl text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-600 mb-4 leading-snug">
            {Arabic ? 'اختر الطعام الصحي الطازج' : 'Choosing Healthy & Fresh Food'}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg mb-6">
            {Arabic
              ? 'أهلاً بكم في بيت مريم، حيث تروي كل وجبة قصة شغف. نحرص على تقديم أجود وأشهى المأكولات لضمان صحتكم.'
              : 'Welcome to Beit Meryam — a place where every meal tells a story of passion. We care about providing the best and freshest food to ensure your health.'}
          </p>

          <div className="space-y-6 text-left">
            {/* Item 1 */}
            <div className="flex items-start gap-4">
              <div className="bg-rose-100 text-rose-600 p-3 rounded-xl flex-shrink-0">
                <FaShoppingCart size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {Arabic ? 'سهل الطلب' : 'Easy to Order'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  {Arabic
                    ? 'الطلب من بيت مريم سهل بفضل منصتنا الإلكترونية سهلة الاستخدام وخدمة العملاء المستجيبة.'
                    : 'Ordering from Beit Meryam is a breeze with our user-friendly online platform and responsive customer service.'}
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-4">
              <div className="bg-rose-100 text-rose-600 p-3 rounded-xl flex-shrink-0">
                <FaUtensils size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {Arabic ? 'طعم لذيذ' : 'Delicious Taste'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  {Arabic
                    ? 'نُقدم نكهات استثنائية أعدّها طهاتنا الماهرون باستخدام مكونات طازجة ووصفات فريدة.'
                    : 'Savor the exceptional flavors crafted by our skilled chefs using the freshest ingredients and unique recipes.'}
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-4">
              <div className="bg-rose-100 text-rose-600 p-3 rounded-xl flex-shrink-0">
                <FaTruck size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {Arabic ? 'توصيل سريع' : 'Fastest Delivery'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  {Arabic
                    ? 'نضمن لك توصيل سريع وساخن مباشرة إلى بابك.'
                    : 'Enjoy our speedy delivery service that ensures your meal arrives hot and fresh, right to your doorstep.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default About
