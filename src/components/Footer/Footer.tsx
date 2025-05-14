import { useLocale } from 'next-intl'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  const locale = useLocale()
  const Arabic = locale === 'ar'

  return (
    <footer className="bg-gray-100 mt-10 dark:bg-gray-900 py-10">
      <div
        className={`container mx-auto px-6 md:px-12 flex flex-col md:flex-row ${
          Arabic ? 'md:flex-row-reverse' : ''
        } justify-between items-start gap-8`}
      >
        {/* Logo and description */}
        <div className="max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            {Arabic ? 'مطعمنا' : 'Our Restaurant'}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {Arabic
              ? 'نقدم لك تجربة طعام استثنائية تجمع بين النكهات الأصيلة والخدمة الراقية في أجواء مميزة.'
              : 'We offer an exceptional dining experience that blends authentic flavors with outstanding service in a delightful ambiance.'}
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            {Arabic ? 'روابط' : 'Links'}
          </h3>
          <ul className={`space-y-2 text-sm ${Arabic ? 'text-right' : ''}`}>
            <li>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
                {Arabic ? 'من نحن' : 'About Us'}
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
                {Arabic ? 'تواصل معنا' : 'Contact Us'}
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
                {Arabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            {Arabic ? 'تابعنا' : 'Follow Us'}
          </h3>
          <div className="flex gap-4 text-gray-600 dark:text-gray-300 text-lg">
            <a href="#" className="hover:text-blue-600 dark:hover:text-white transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400 dark:hover:text-white transition"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500 dark:hover:text-white transition"><FaInstagram /></a>
            <a href="#" className="hover:text-red-600 dark:hover:text-white transition"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 pt-4">
        {Arabic
          ? '© 2025 جميع الحقوق محفوظة لمطعمنا.'
          : '© 2025 All rights reserved by Our Restaurant.'}
      </div>
    </footer>
  )
}

export default Footer
