import React,{useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';

const Contact = () => {
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
    <div>
      <h1>
      contact
      </h1>
    <ToastContainer />
    </div>
  )
}

export default Contact
