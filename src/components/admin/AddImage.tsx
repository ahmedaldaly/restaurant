'use client'
import axios from 'axios';
import { useLocale } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { BaseUrl } from '../BaseUrl';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from "react-icons/md";


type FormData = {
  images: FileList;
};
interface image {
  _id:string
  url:string
}
const AddImage = () => {
  const [image, setImage] = useState<image[]>([])
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
    formData.append('images', data.images[0]); // خد أول صورة فقط

    axios.post(`${BaseUrl}/api/v1/image/add`, formData, {
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
  useEffect(()=>{
    axios.get(`${BaseUrl}/api/v1/image/`)
    .then((data)=>{
      console.log(data.data)
      setImage(data.data)
    })
  },[])
const remove = (id:string)=>{
  try{
    axios.delete(`${BaseUrl}/api/v1/image/${id}`,{
      headers:{
        authorization:`Bearer ${token}`
      }
      
    })
    .then((data)=>{
      setImage(image.filter((item)=>item._id !==id))
    })
  }catch(err){console.log(err)}
}
  return (
    <>
    <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4 dark:bg-gray-800 bg-gray-100 rounded">
         <label>{Arabic ? 'الصورة:' : 'Image:'}</label>
         <input
           type="file"
           accept="image/*"
           {...register("images", { required: true })}
           className="border p-2 rounded"
         />
   
         <button type="submit" className="bg-blue-500 cursor-pointer text-white py-2 px-4 rounded">
           {loading?Arabic?'جاري التحميل':'Loading':Arabic?'اضافة الصوره':'Add Image'}
          
         </button>
       </form>
               <ToastContainer />
               <div className='w-full flex flex-wrap justify-center gap-7 '>
                {image.map((item)=>(
                  <div className='relative ' key={item._id}>
                    <img className='w-40' src={item.url} alt="image" />
                    <div
                    onClick={()=>remove(item._id)}
                    className='absolute bottom-0 cursor-pointer text-2xl text-red-600 right-3'><MdDelete/></div>
                  </div>
                ))}
               </div>
    </>
  )
}

export default AddImage