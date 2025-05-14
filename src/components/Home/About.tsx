import { useLocale } from 'next-intl'
import React from 'react'
import { FaShoppingCart, FaUtensils, FaTruck } from 'react-icons/fa'
const About = () => {
    const locale = useLocale()
    const Arabic = locale ==='ar'
  return (
    <div>
         <h1 className='py-10 text-center text-5xl font-bold'>{Arabic?' حول':' About Us'}</h1>
      <div className='flex w-ful justify-center gap-5 items-center'>
        <hr className='w-20 text-pink-700'/>
        <img className='w-10' src="/spoon.svg" alt="" />
        <hr className='w-20 text-pink-700'/>
      </div>
      <section className='w-full px-6 md:px-16 py-20 flex flex-col md:flex-row items-center gap-12'>
        <img
          src="/about.png"
          alt="about"
          className='w-full md:w-[550px] rounded-3xl shadow-xl object-cover'
        />

        <div className='max-w-2xl'>
          <h2 className='text-4xl md:text-5xl font-bold text-rose-600 mb-4 leading-snug'>
            {Arabic ? 'اختر الطعام الصحي الطازج' : 'Choosing Healthy & Fresh Food'}
          </h2>
          <p className='text-gray-700 dark:text-gray-300 text-base md:text-lg mb-4'>
            {Arabic
              ? 'أهلاً بكم في بيت مريم، حيث تروي كل وجبة قصة شغف. نحرص على تقديم أجود وأشهى المأكولات لضمان صحتكم.'
              : 'Welcome to Beit Meryam — a place where every meal tells a story of passion. We care about providing the best and freshest food to ensure your health.'}
          </p>

          <div className='mt-8 space-y-6'>
            {/* Item 1 */}
            <div className='flex items-start gap-4'>
              <div className='bg-rose-100 text-rose-600 p-3 rounded-xl'>
                <FaShoppingCart size={20} />
              </div>
              <div>
                <h3 className='text-lg font-bold'>
                  {Arabic ? 'سهل الطلب' : 'Easy to Order'}
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  {Arabic
                    ? 'الطلب من بيت مريم سهل بفضل منصتنا الإلكترونية سهلة الاستخدام وخدمة العملاء المستجيبة.'
                    : 'Ordering from Beit Meryam is a breeze with our user-friendly online platform and responsive customer service.'}
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className='flex items-start gap-4'>
              <div className='bg-rose-100 text-rose-600 p-3 rounded-xl'>
                <FaUtensils size={20} />
              </div>
              <div>
                <h3 className='text-lg font-bold'>
                  {Arabic ? 'طعم لذيذ' : 'Delicious Taste'}
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  {Arabic
                    ? 'نُقدم نكهات استثنائية أعدّها طهاتنا الماهرون باستخدام مكونات طازجة ووصفات فريدة.'
                    : 'Savor the exceptional flavors crafted by our skilled chefs using the freshest ingredients and unique recipes.'}
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className='flex items-start gap-4'>
              <div className='bg-rose-100 text-rose-600 p-3 rounded-xl'>
                <FaTruck size={20} />
              </div>
              <div>
                <h3 className='text-lg font-bold'>
                  {Arabic ? 'توصيل سريع' : 'Fastest Delivery'}
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  {Arabic
                    ? 'نضمن لك توصيل سريع وساخن مباشرة إلى بابك.'
                    : 'Enjoy our speedy delivery service that ensures your meal arrives hot and fresh, right to your doorstep.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About