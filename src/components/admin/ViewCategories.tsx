'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../BaseUrl'
import { MdDelete } from "react-icons/md";
import Cookies from 'js-cookie';
interface category {
  _id:string
  name:string
  image:{
    url:string
  }
}
const ViewCategories = () => {
  const token =Cookies.get('userToken')
  const [category, setCategory] = useState<category[]>([])
  useEffect(()=>{
    axios.get(`${BaseUrl}/api/v1/category`)
    .then((data)=>{
      console.log(data.data)
      setCategory(data.data)
    })
  },[])
  const remove = (id:string)=>{
    try{
      axios.delete(`${BaseUrl}/api/v1/category/${id}`,{
        headers:{
          authorization:`Bearer ${token}`
        }
      })
      .then((data)=>{
        setCategory(category.filter(item =>item._id !== id) )
      })
    }catch(err){console.log(err)}
  }
  return (
    <div className='w-full min-h-[80vh] hide-scrollbar gap-5 overflow-scroll my-5 flex flex-wrap'>
      
      {category.map((item)=>(
        <div key={item._id}>
          <img className='w-42' src={item.image.url} alt={item.name} />
          <h1 className='text-center'>{item.name}</h1>
          <div 
          onClick={()=>remove(item._id)}
          className='w-full flex justify-center my-2 text-red-500 text-2xl cursor-pointer'><MdDelete/></div>
        </div>
      ))}
    </div>
  )
}

export default ViewCategories