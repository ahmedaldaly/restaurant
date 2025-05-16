"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../BaseUrl";
import { useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import {  Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const Images = () => {
  const locale = useLocale();
  const Arabic = locale === "ar";
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`${BaseUrl}/api/v1/image/`)
      .then((response) => setImages(response.data))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <div className="py-16 px-4 md:px-12">
      <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white mb-6">
        {Arabic ? "معرض الصور" : "Photo Gallery"}
      </h1>

      <div className="flex justify-center gap-5 items-center mb-10">
        <hr className="w-20 border-pink-500" />
        <img className="w-10" src="/spoon.svg" alt="spoon" />
        <hr className="w-20 border-pink-500" />
      </div>

      <Swiper
        modules={[ Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {images.map((img: any, index: number) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.2 }}
              className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            >
              <img
                src={img.url}
                alt={`gallery-${index}`}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Images;
