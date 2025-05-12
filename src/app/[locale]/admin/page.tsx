'use client'
import React, { useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ViewProducts from '@/components/admin/ViewProduct';
import AddProduct from '@/components/admin/AddProduct';
import ViewCategories from '@/components/admin/ViewCategories';
import AddCategory from '@/components/admin/AddCategory';
import AddImage from '@/components/admin/AddImage';
import Orders from '@/components/admin/Orders';
import { useLocale } from 'next-intl';

const AdminPage = () => {
  const locale = useLocale();
  const Arabic = locale === 'ar';
  const sliderRef = useRef<React.ElementRef<typeof Slider>>(null);

  const tabs = [
    { component: <AddCategory /> },
    { component: <ViewCategories /> },
    { component: <AddProduct /> },
    { component: <ViewProducts /> },
    { component: <AddImage /> },
    { component: <Orders /> },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const nextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className="w-[70%] mx-auto mt-10">
      {/* أزرار السابق والتالي */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={prevSlide}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {Arabic ? 'السابق' : 'Previous'}
        </button>
        <button
          onClick={nextSlide}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {Arabic ? 'التالي' : 'Next'}
        </button>
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
  );
};

export default AdminPage;
