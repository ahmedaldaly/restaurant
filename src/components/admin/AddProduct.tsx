'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BaseUrl } from '../BaseUrl';
import { useLocale } from 'next-intl';

const AddProduct = () => {

  const token = Cookies.get('userToken');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState([{ size: '', price: '' }]);
  const [images, setImages] = useState<File[]>([]);
const [getCategory, setGetCategory] = useState<any>([])
const locale = useLocale()
const Arabic =locale ==='ar'
  const handleAddSize = () => {
    setSizes([...sizes, { size: '', price: '' }]);
  };
useEffect(()=>{
  axios.get(`${BaseUrl}/api/v1/category`)
  .then((data)=>setGetCategory(data.data))
},[])
  const handleSizeChange = (index: number, field: string, value: string) => {
    const newSizes = [...sizes];
    newSizes[index][field as 'size' | 'price'] = value;
    setSizes(newSizes);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('descriptionAr', descriptionAr);
    formData.append('category', category);
    formData.append('sizes', JSON.stringify(sizes));

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      setLoading(true)
      const res = await axios.post(`${BaseUrl}/api/v1/product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('تمت الإضافة بنجاح:', res.data);
      setLoading(false)
      alert('تمت الإضافة بنجاح!');
    } catch (err) {
      console.error('فشل الإضافة:', err);
         setLoading(false)
      alert('حدث خطأ أثناء الإضافة.');
    }
  };

  return (
    <div className="max-w-2xl  mx-auto p-6 bg-white dark:bg-gray-900 shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">إضافة منتج جديد</h2>

      <input
        type="text"
        placeholder={Arabic?'العنوان':'Title'}
        className="w-full mb-3 p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder={Arabic?'الوصف':'description'}
        className="w-full mb-3 p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <textarea
        placeholder={Arabic?"الوصف بالعربية":"description in Arabic"}
        className="w-full mb-3 p-2 border rounded"
        value={descriptionAr}
        onChange={(e) => setDescriptionAr(e.target.value)}
      />
     <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full mb-3 p-2 border rounded"
>
  <option value="" className=''>{Arabic?'اختار الفئة':'Choose category'} </option>
  {getCategory.map((item: any) => (
    <option className='dark:text-black ' value={item.name} key={item._id}>
      {item.name}
    </option>
  ))}
</select>

      <div className="mb-3">
        <p className="mb-2 text-gray-700 dark:text-gray-300">{Arabic?"الحجم والسعر":"Size and price"}</p>
        {sizes.map((s, index) => (
          <div key={index} className="flex gap-2 flex-wrap mb-2">
            <input
              type="text"
              placeholder={Arabic?'الحجم':'size'}
              className="flex-1 p-2 border rounded"
              value={s.size}
              onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
            />
            <input
              type="number"
              placeholder={Arabic?'السعر':'price'}
              className="flex-1 p-2 border rounded"
              value={s.price}
              onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
            />
          </div>
        ))}
        <button
          onClick={handleAddSize}
          className="text-sm text-blue-600 hover:underline"
        >
          + إضافة مقاس
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">{Arabic?'صور للمنتج':'Product images'}</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        {loading?Arabic?'جار الاضافة  ... ':'Loading ...':Arabic?'اضافة المنتج':'Add Product'}
     
      </button>
    </div>
  );
};

export default AddProduct;
