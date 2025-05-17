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
const [imageIndexes, setImageIndexes] = useState<{ [key: string]: number }>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDescAr, setEditDescAr] = useState("");

  useEffect(() => {
    axios.get(`${BaseUrl}/api/v1/product/`).then((data) => {
      console.log(data.data);
      setProduct(data.data);
    });
  }, []);

  const remove = (id: string) => {
    try {
      axios
        .delete(`${BaseUrl}/api/v1/product/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then(() => setProduct(product.filter((item) => item._id !== id)));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      await axios.put(
        `${BaseUrl}/api/v1/product/${id}`,
        {
          title: editTitle,
          description: editDesc,
          descriptionAr: editDescAr,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      // تحديث البيانات في الواجهة
      setProduct((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                title: editTitle,
                description: editDesc,
                descriptionAr: editDescAr,
              }
            : item
        )
      );

      setEditId(null);
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  return (
    <div className="w-full min-h-screen p-5">
      <div className="flex justify-center flex-wrap gap-6">
        {product.map((item) => (
          <div
            key={item._id}
            className="bg-white w-56 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
          <img
  onMouseEnter={() =>
    setImageIndexes((prev) => ({
      ...prev,
      [item._id]: ((prev[item._id] || 0) + 1) % item.images.length,
    }))
  }
  onMouseLeave={() =>
    setImageIndexes((prev) => ({
      ...prev,
      [item._id]: 0,
    }))
  }
  src={item.images[imageIndexes[item._id] || 0]?.url}
  alt={item.title}
  className="w-full h-48 object-cover object-center"
/>

            <div className="p-4 flex flex-col gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Category: {item.category}
              </p>

              {editId === item._id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                  <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                  <textarea
                    value={editDescAr}
                    onChange={(e) => setEditDescAr(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-3 rounded"
                    >
                      حفظ
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-400 hover:bg-gray-500 text-white text-sm py-1 px-3 rounded"
                    >
                      إلغاء
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.sizes.map((size, idx) => (
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
                      onClick={() => {
                        setEditId(item._id);
                        setEditTitle(item.title);
                        setEditDesc(item.description);
                        setEditDescAr(item.descriptionAr); // << أضف هذا السطر
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 px-3 rounded"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => remove(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded"
                    >
                      حذف
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProduct;
