'use client'
import axios from 'axios';
import { useLocale } from 'next-intl';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { BaseUrl } from '../BaseUrl';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
type FormData = {
  name: string;
  image: FileList;
};

const AddCategory = () => {
  const token = Cookies.get('userToken');
  const locale = useLocale();
  const Arabic = locale === 'ar';
const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    setLoading(true)
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image[0]); // خد أول صورة فقط

    axios.post(`${BaseUrl}/api/v1/category`, formData, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      console.log('Category Added:', res.data);
      setLoading(false)
      toast.success('success')
    })
    .catch(err => {
      console.error('Error:', err);
       setLoading(false)
        toast.error('faild')
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4 dark:bg-gray-800 bg-gray-100 rounded">
      <label>{Arabic ? "الاسم:" : "Name:"}</label>
      <input {...register("name", { required: true })} className="border p-2 rounded" />

      <label>{Arabic ? 'الصورة:' : 'Image:'}</label>
      <input
        type="file"
        accept="image/*"
        {...register("image", { required: true })}
        className="border p-2 rounded"
      />

      <button type="submit" className="bg-blue-500 cursor-pointer text-white py-2 px-4 rounded">
        {loading?Arabic?'جاري التحميل':'Loading':Arabic?'اضافة الفئة':'Add Category'}
       
      </button>
            <ToastContainer />
    </form>
  );
};

export default AddCategory;
