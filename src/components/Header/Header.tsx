"use client";
import { useForm } from "react-hook-form"
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import React, { useEffect, useState } from "react";
import cookie from 'js-cookie'
  import { IoIosArrowDropdown } from "react-icons/io";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";
import Link from "next/link";
import { RiMenu3Fill } from "react-icons/ri";
import { RiMenu2Fill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";
type FormData = {
  email: string
  password: string
}
interface user {
  _id:string,
  email:string,
  name:string,
  isAdmin:boolean
}
const token = cookie.get('userToken')
const Header = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const onSubmit = handleSubmit((data) => {
    try{
      axios.post(`${BaseUrl}/api/v1/auth/login`,{
        email:data.email,
        password:data.password
      })
      .then((data)=>{
        console.log(data.data)
        cookie.set('userToken',data.data.token)
        window.location.href ='/'
      })
    }catch(err){console.log(err)}
  })
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const switchTo = locale === "en" ? "ar" : "en";
  const Arabic = locale === "ar";

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scroll, setScroll] = useState(false);
  const [menu, setMenu] = useState(false);

  const [logUser, setLogUser] = useState(false);
  const [orderMenu, setOrderMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [openLang, setOpenLang] = useState(false);
const [user, setUser] = useState<user>()

  useEffect(() => {
    axios.get(`${BaseUrl}/api/v1/user`,{
      headers:{
        authorization: `Bearer ${token}`
      }
    }).then((data)=>{
      console.log(data.data)
      setUser(data.data)
    })
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const preferred = savedTheme || "light";
    setTheme(preferred);
    document.cookie = `theme=${preferred}; path=/;`;
    document.documentElement.classList.toggle("dark", preferred === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.cookie = `theme=${newTheme}; path=/;`;
  };

  const handleSwitchTo = (lang: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    router.push(`/${lang}${pathWithoutLocale}`);
    setOpenLang(false);
  };
  console.log(pathname);
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
const handleLogout = () => {
  cookie.remove('userToken');
  setLogUser(false);
 window.location.href ='/'
};

  return (
    <>
    <AnimatePresence>
      <motion.header
        key="main-header"
        initial={{ height: "72px", opacity: 0 }}
        animate={{ height: menu ? "256px" : "72px", opacity: 1 }}
        exit={{ height: "72px" }}
        transition={{ duration: 0.2 }}
        className={` ${
          menu
            ? "h-64 flex-wrap w-full flex justify-between backdrop-blur-xl items-start pt-5 px-5"
            : "w-full h-18 flex justify-evenly items-center bg-white/70 backdrop-blur-xl dark:text-white dark:bg-[#020817]"
        }  ${
          scroll &&
          "fixed top-0 shadow-md dark:bg-black/35 dark:shadow-gray-900"
        } z-50 max-md:justify-between max-md:px-5 `}
      >
        {/* Logo */}
        <div className="flex justify-center items-center">
          <img src="/logo.png" alt="Logo" className="w-24" />
          <h1 className="font-bold max-md:hidden">
            {Arabic ? "بيت مريم" : "Beit Meryam"}
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex justify-center items-center max-md:hidden gap-5">
          <Link
            className={`${
              pathname.endsWith(`/${locale}`)
                ? "text-black font-bold border-b-2 border-yellow-400 dark:text-yellow-400"
                : "text-gray-400 hover:text-black dark:hover:text-yellow-300"
            } transition-all duration-300 ease-in-out`}
            href="/"
          >
            {Arabic ? "الرئيسية" : "Home"}
          </Link>

          <Link
            className={`${
              pathname.endsWith("/about")
                ? "text-black font-bold border-b-2 border-yellow-400 dark:text-yellow-400"
                : "text-gray-400 hover:text-black dark:hover:text-yellow-300"
            } transition-all duration-300 ease-in-out`}
            href="/about"
          >
            {Arabic ? "حول" : "About Us"}
          </Link>

          <Link
            className={`${
              pathname.endsWith("/menu")
                ? "text-black font-bold border-b-2 border-yellow-400 dark:text-yellow-400"
                : "text-gray-400 hover:text-black dark:hover:text-yellow-300"
            } transition-all duration-300 ease-in-out`}
            href="/menu"
          >
            {Arabic ? "القائمة" : "Menu"}
          </Link>

          <Link
            className={`${
              pathname.endsWith("/content")
                ? "text-black font-bold border-b-2 border-yellow-400 dark:text-yellow-400"
                : "text-gray-400 hover:text-black dark:hover:text-yellow-300"
            } transition-all duration-300 ease-in-out`}
            href="/content"
          >
            {Arabic ? "اتصل بنا" : "Contact Us"}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex justify-center items-center gap-5 max-md:gap-1 relative">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="text-xl h-9 w-9  max-sm:w-7 max-sm:h-7 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex justify-center items-center"
          >
            {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
          </button>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              className="text-xl  max-sm:w-7 max-sm:h-7 h-9 w-9 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex justify-center items-center"
              onClick={() => setOpenLang(!openLang)}
            >
              <IoLanguageSharp />
            </button>

            {openLang && (
              <div className="absolute  right-0 mt-4 pt-2 w-32 bg-white dark:bg-gray-800 rounded-md h-22 shadow-lg z-50 text-sm">
                <button
                  onClick={() => handleSwitchTo("en")}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  English
                </button>
                <button
                  onClick={() => handleSwitchTo("ar")}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  العربية
                </button>
              </div>
            )}
          </div>
{/* here */}
          {/* User */}
         {token? <button
            onClick={() => setLogUser(!logUser)}
            className="text-xl  max-sm:w-7 max-sm:h-7  h-9 w-9 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex justify-center items-center"
          >
            <FaUserCircle />
          </button>: <button
            onClick={() => setUserMenu(!userMenu)}
            className="text-xl  max-sm:w-7 max-sm:h-7  h-9 w-9 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex justify-center items-center"
          >
            <FaUserCircle />
          </button>}

          {/* Cart */}
          <button
            onClick={() => setOrderMenu(!orderMenu)}
            className="text-xl  max-sm:w-7 max-sm:h-7  h-9 w-9 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex justify-center items-center"
          >
            <MdOutlineShoppingCart />
          </button>
          <button
            onClick={() => setMenu(!menu)}
            className="text-xl hidden  max-sm:w-7 max-sm:h-7 max-md:flex h-9 w-9 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800  justify-center items-center"
          >
            {Arabic ? <RiMenu2Fill /> : <RiMenu3Fill />}
          </button>
        </div>
        {menu && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="w-full flex flex-wrap px-5"
          >
            <Link
              className="w-full h-8 border-b-1  duration-300 hover:border-b-orange-400 border-gray-100 dark:border-gray-800 text-lg "
              href="/"
            >
              {Arabic ? "الرئسية" : "Home"}
            </Link>
            <Link
              className="w-full h-8 border-b-1  duration-300 hover:border-b-orange-400 border-gray-100 dark:border-gray-800 text-lg "
              href="/about"
            >
              {Arabic ? "حول" : "About Us"}
            </Link>
            <Link
              className="w-full h-8 border-b-1  duration-300 hover:border-b-orange-400 border-gray-100 dark:border-gray-800 text-lg "
              href="/menu"
            >
              {Arabic ? "القائمة" : "Menu"}
            </Link>
            <Link
              className="w-full h-8 border-b-1  duration-300 hover:border-b-orange-400 border-gray-100 dark:border-gray-800 text-lg "
              href="/content"
            >
              {Arabic ? "اتصال" : "Content Us"}
            </Link>
          </motion.div>
        )}
      </motion.header>
      
    </AnimatePresence>
      <AnimatePresence>
        {orderMenu && (
          <motion.div
            key="order-menu"
            initial={{ x: Arabic ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: Arabic ? "-100%" : "100%" }}
            transition={{ duration: 0.5 }}
            className={`w-80 h-full dark:bg-black/50 backdrop-blur-lg dark:text-white dark:border-gray-700 dark:shadow-gray-600 z-50 flex flex-wrap fixed top-0 bg-white/40 border-1 border-gray-200 shadow-md ${
              Arabic ? "left-0" : "right-0"
            }`}
          >
            <div className="w-full flex justify-between px-5 text-xl pt-5">
              <span
                onClick={() => setOrderMenu(!orderMenu)}
                className="text-3xl cursor-pointer hover:text-orange-500"
              >
                <CgClose />
              </span>
              <h1>{Arabic ? "عربة التسوق" : "Shoping Card"}</h1>
            </div>
            {/*  */}
          </motion.div>
        )}
      </AnimatePresence>
      {/*  */}
    <AnimatePresence>
  {userMenu && !token&&(
    <motion.div
      key="user-menu"
      initial={{ x: Arabic ? "-100%" : "100%" }}
      animate={{ x: 0 }}
      exit={{ x: Arabic ? "-100%" : "100%" }}
      transition={{ duration: 0.5 }}
      className={`w-80 h-full fixed top-0 z-50 flex flex-col gap-5 px-5 py-6 
        backdrop-blur-lg bg-white/40 dark:bg-black/50 
        border border-gray-200 dark:border-gray-700 
        shadow-md dark:shadow-gray-600 dark:text-white 
        ${Arabic ? "left-0" : "right-0"}`}
    >
      {/* العنوان وإغلاق */}
      <div className="w-full flex justify-between items-center text-xl">
        <span
          onClick={() => setUserMenu(false)}
          className="text-3xl cursor-pointer hover:text-orange-500"
        >
          <CgClose />
        </span>
        <h1 className="font-semibold text-lg">
          {Arabic ? "إدارة حسابك" : "Manage your account"}
        </h1>
      </div>

      {/* النموذج */}
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 mt-4 w-full"
      >
        <label className="text-sm font-medium">
          {Arabic ? "البريد الإلكتروني" : "Email"}:
        </label>
        <input
          className="h-11 px-3 rounded-md border border-gray-300 dark:border-gray-700 
            focus:outline-none focus:ring-2 focus:ring-orange-400 
            dark:bg-gray-800 dark:text-white transition-all duration-200"
          {...register("email")}
        />

        <label className="text-sm font-medium">
          {Arabic ? "كلمة المرور" : "Password"}:
        </label>
        <input
          type="password"
          className="h-11 px-3 rounded-md border border-gray-300 dark:border-gray-700 
            focus:outline-none focus:ring-2 focus:ring-orange-400 
            dark:bg-gray-800 dark:text-white transition-all duration-200"
          {...register("password")}
        />

        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          className="bg-orange-500 text-white font-semibold rounded-md py-2 mt-2 
            hover:bg-orange-600 transition-all duration-300"
        >
          {Arabic ? "تسجيل دخول" : "Log In"}
        </motion.button>
      </form>
    </motion.div>
  )}
</AnimatePresence>
{/*  */}
<AnimatePresence>
  {logUser && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`w-64 min-h-52 px-4 py-5 rounded-2xl 
        fixed z-20 top-20 
        ${Arabic ? "left-10" : "right-10"} 
        border border-gray-200 shadow-md 
        dark:border-gray-700 dark:shadow-gray-800 
        bg-white/50 backdrop-blur-2xl dark:bg-black/40 
        text-gray-800 dark:text-white`}
    >
      <h1 className="text-xl font-semibold mb-4">
        {Arabic ? "مرحبا 👋" : "Welcome 👋"} {user?.name}
      </h1>
      <button
      onClick={()=>handleLogout()}
        className="w-full py-2 rounded-lg mt-2 bg-red-500 hover:bg-red-600 text-white transition"
      >
        {Arabic ? "تسجيل خروج" : "Log Out"}
      </button>
      {user?.isAdmin&&<Link onClick={()=>setLogUser(!logUser)} href='/admin' className="w-full h-10 bg-gray-200 rounded-md my-2 px-2 flex justify-between dark:bg-gray-700 items-center">
        <p >Admin</p>
        <span><IoIosArrowDropdown/></span>
  
        </Link>}

    </motion.div>
  )}
</AnimatePresence>

</>
  );
};

export default Header;
