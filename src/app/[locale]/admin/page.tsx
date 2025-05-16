'use client'
import React, { useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import Cookies from 'js-cookie';
import ViewProducts from '@/components/admin/ViewProduct';
import AddProduct from '@/components/admin/AddProduct';
import ViewCategories from '@/components/admin/ViewCategories';
import AddCategory from '@/components/admin/AddCategory';
import AddImage from '@/components/admin/AddImage';
import Orders from '@/components/admin/Orders';
import { useLocale } from 'next-intl';
import PageWrapper from '@/components/PageWrapper';
import { BaseUrl } from '@/components/BaseUrl';


interface User {
  _id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

const AdminPage = () => {
  const locale = useLocale();
  const Arabic = locale === 'ar';
  const sliderRef = useRef<React.ElementRef<typeof Slider>>(null);
  const [user, setUser] = useState<User | null>(null);
  const token = Cookies.get('userToken');

  const tabs = [
    { name: Arabic ? 'إضافة تصنيف' : 'Add Category', component: <AddCategory /> },
    { name: Arabic ? 'عرض التصنيفات' : 'View Categories', component: <ViewCategories /> },
    { name: Arabic ? 'إضافة منتج' : 'Add Product', component: <AddProduct /> },
    { name: Arabic ? 'عرض المنتجات' : 'View Products', component: <ViewProducts /> },
    { name: Arabic ? 'إضافة صورة' : 'Add Image', component: <AddImage /> },
    { name: Arabic ? 'الطلبات' : 'Orders', component: <Orders /> },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const goToSlide = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  };

  const buttons = Arabic ? [...tabs].reverse() : tabs;

  useEffect(() => {
    axios.get(`${BaseUrl}/api/v1/user`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setUser(res.data);
      if (!res.data?.isAdmin) {
    window.location.href ='/'
      }
    }).catch(err => {
      console.error("فشل في جلب بيانات المستخدم", err);
    window.location.href ='/'
    });
  }, []);

  return (
    <PageWrapper>
      <div className='w-full min-h-screen dark:bg-black/90'>
        <div className="w-[70%] mx-auto pt-10 max-md:w-[90%]">
          {/* أزرار التنقل بين المكونات */}
          <div className={`flex ${Arabic ? 'flex-row-reverse' : ''} justify-center gap-2 mb-6 flex-wrap`}>
            {buttons.map((tab, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* السلايدر */}
          <Slider ref={sliderRef} {...settings}>
            {tabs.map((tab, index) => (
              <div key={index}>
                {tab.component}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AdminPage;
