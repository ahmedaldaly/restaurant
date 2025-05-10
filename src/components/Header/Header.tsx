'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode, MdOutlineShoppingCart } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";
import Link from 'next/link';
import { RiMenu3Fill } from "react-icons/ri";
import { RiMenu2Fill } from "react-icons/ri";
import { motion } from "motion/react"
const Header = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const switchTo = locale === 'en' ? 'ar' : 'en';
  const Arabic = locale === 'ar';

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [scroll, setScroll] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const preferred = savedTheme || 'light';
    setTheme(preferred);
    document.cookie = `theme=${preferred}; path=/;`;
    document.documentElement.classList.toggle('dark', preferred === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.cookie = `theme=${newTheme}; path=/;`;
  };

  const handleSwitchTo = (lang: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    router.push(`/${lang}${pathWithoutLocale}`);
    setOpenLang(false);
  };
console.log(pathname)
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
   initial={{opacity:0,y:-100}}
   animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    className={`w-full h-18 flex justify-evenly items-center bg-white/70 backdrop:backdrop-blur-2xl dark:text-white dark:bg-[#020817] ${scroll && 'fixed top-0 shadow-md dark:bg-black/35 dark:shadow-gray-900'} z-50`}>
      {/* Logo */}
      <div className='flex justify-center items-center'>
        <img src="/logo.png" alt="Logo" className='w-24' />
        <h1 className='font-bold'>{Arabic ? "بيت مريم" : "Beit Meryam"}</h1>
      </div>

      {/* Navigation */}
      <nav className='flex justify-center items-center max-md:hidden gap-5'>
      <Link
  className={`${pathname.endsWith(`/${locale}`) 
    ? 'text-black font-bold border-b-2 border-yellow-400 dark:text-yellow-400' 
    : 'text-gray-400 hover:text-black dark:hover:text-yellow-300'} transition-all duration-300 ease-in-out`}
  href='/'
>
  {Arabic ? "الرئيسية" : "Home"}
</Link>

<Link
  className={`${pathname.endsWith('/about') 
    ? 'text-black font-bold border-b-2 border-yellow-400 dark:text-yellow-400' 
    : 'text-gray-400 hover:text-black dark:hover:text-yellow-300'} transition-all duration-300 ease-in-out`}
  href='/about'
>
  {Arabic ? "حول" : "About Us"}
</Link>

<Link
  className={`${pathname.endsWith('/menu') 
    ? 'text-black font-bold border-b-2 border-yellow-400 dark:text-yellow-400' 
    : 'text-gray-400 hover:text-black dark:hover:text-yellow-300'} transition-all duration-300 ease-in-out`}
  href='/menu'
>
  {Arabic ? "القائمة" : "Menu"}
</Link>

<Link
  className={`${pathname.endsWith('/content') 
    ? 'text-black font-bold border-b-2 border-yellow-400 dark:text-yellow-400' 
    : 'text-gray-400 hover:text-black dark:hover:text-yellow-300'} transition-all duration-300 ease-in-out`}
  href='/content'
>
  {Arabic ? "اتصل بنا" : "Contact Us"}
</Link>

      </nav>

      {/* Actions */}
      <div className='flex justify-center items-center gap-5 max-md:gap-1 relative'>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="text-xl h-9 w-9 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex justify-center items-center"
        >
          {theme === 'dark' ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </button>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            className="text-xl  max-sm:hidden h-9 w-9 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex justify-center items-center"
            onClick={() => setOpenLang(!openLang)}
          >
            <IoLanguageSharp />
          </button>

          {openLang && (
            <div className="absolute right-0 mt-4 pt-2 w-32 bg-white dark:bg-gray-800 rounded-md h-22 shadow-lg z-50 text-sm">
              <button
                onClick={() => handleSwitchTo('en')}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                English
              </button>
              <button
                onClick={() => handleSwitchTo('ar')}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                العربية
              </button>
            </div>
          )}
        </div>

        {/* User */}
        <button className="text-xl max-md:hidden h-9 w-9 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex justify-center items-center">
          <FaUserCircle />
        </button>

        {/* Cart */}
        <button className="text-xl h-9 w-9 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex justify-center items-center">
          <MdOutlineShoppingCart />
        </button>
        <button className="text-xl hidden max-md:flex h-9 w-9 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800  justify-center items-center">
         {Arabic?<RiMenu2Fill/>:<RiMenu3Fill/>}
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
