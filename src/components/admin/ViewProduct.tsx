"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";
interface product {
  _id: string;
  category: string;
  description: string;
  descriptionAr: string;
  title: string;
  sizes: {
    price: number;
    size: string;
  }[];
  images: {
    url: string;
    id: string;
    _id: string;
  }[];
}
const ViewProduct = () => {
  const token = Cookies.get("userToken");
  const [product, setProduct] = useState<product[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    axios.get(`${BaseUrl}/api/v1/product/`).then((data) => {
      console.log(data.data);
      setProduct(data.data);
    });
  }, []);
  const remove =(id:string)=>{
    try{
      axios.delete(`${BaseUrl}/api/v1/product/${id}`,{
        headers:{
          authorization:`Bearer ${token}`
        }
      })
      .then((data)=>setProduct(product.filter((item)=>item._id !==id)))
    }catch(err){console.log(err)}
  }
  return (
    <div className="w-full min-h-screen p-5 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {product.map((item) => (
          <div
            key={item._id}
            className="bg-white w-56 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              onMouseEnter={() =>
                setImageIndex((prevIndex) =>
                  prevIndex + 1 >= item.images.length ? 0 : prevIndex + 1
                )
              }
              onMouseLeave={()=>setImageIndex(0)}
              src={item.images[imageIndex]?.url}
              alt={item.title}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-4 flex flex-col gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Category: {item.category}
              </p>
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {item.title}
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {item.sizes.map((size: any, idx: any) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {size.size} - ${size.price}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
            
                className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white text-sm py-1 px-3 rounded">
                  تعديل
                </button>
                <button
                    onClick={()=>remove(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded">
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProduct;
