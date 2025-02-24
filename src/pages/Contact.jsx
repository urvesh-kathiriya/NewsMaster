import React,{useEffect} from 'react'
import {  useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Contact = () => {
  const navigate = useNavigate();
    const styles ={
      fontSize: "16px",
          fontWeight: "bold",
          padding: "12px 20px",
          borderRadius: "8px",
          width: "300px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    }
    useEffect(()=>{
      toast("Contact Us!", { type: "success", position: "bottom-right", autoClose: 3000 ,style:styles });
    },[])
  return (
    <div className='flex flex-col justify-center items-center '>
      <h1 className='text-3xl text-red-600 p-4'>
      Fetch Api Using The  TanStack Query
      </h1>
      <div className='p-4 flex gap-4'>
      <button onClick={()=>navigate("/tanstackqureyapi")} className='p-4 bg-amber-400'>
      TanStackQureyApi
      </button>

      <button onClick={()=>navigate("/pagination")} className='p-4 bg-red-400'>
      PaginationUsingAPI
      </button>
      </div>
    <ToastContainer />
    </div>
  )
}

export default Contact
