import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const NotFound = () => {
    const navigate = useNavigate();
     const handlehome=()=>{
        return navigate("/")
     }
  return (
    <div className="flex flex-col items-center  h-screen text-center">
        <img src={logo} alt="" className="w-75 h-75"/>
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="text-lg mt-4">Sorry, the page you are looking for does not exist.</p>
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded" onClick={handlehome}>
        Go Bck NewsMaster
      </button>
    </div>
  );
};

export default NotFound;
