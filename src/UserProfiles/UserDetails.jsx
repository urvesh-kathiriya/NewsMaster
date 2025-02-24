import React, { useContext } from 'react'
import { UserContext } from '../creactContext/UserInfoContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftCircleIcon } from 'lucide-react';
import { Pencil } from "lucide-react";
import logo from "../assets/logo.png"
import cover from "../assets/cover.png"


const UserDetails = () => {
  const { userName, setUsername, password, setPassword } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-3 shadow-[#9A6CC9]  mb-10 ">
      <div className="relative bg-gray-300 h-64 flex items-center justify-around">
        <img src={cover} alt="" className="h-64 w-full" />
        <button className="absolute top-4 right-4 bg-yellow-500 text-white text-sm px-4 py-2 rounded">Enhance cover image</button>
      </div>

      <div className="flex flex-col p-8 relative">
        <div className="w-32 h-32 border-4 bg-gray-800 border-white rounded-full overflow-hidden absolute -mt-16">
          <img src={logo} alt="Profile" className="w-full h-full object-cover" />
        </div>

        <h2 className="text-2xl font-semibold mt-16">{userName}</h2>
        <p className="text-gray-600 text-lg">+91 9898523580</p>
        <p className="text-md text-gray-500">Ahmedabad, Gujarat, India &middot; <a href="#" className="text-blue-500">Contact info</a></p>

        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full text-lg flex justify-center items-center">
          <span className="mr-2"><Pencil /></span> Edit the Profile
        </button>
      </div>
    </div>

  )
}

export default UserDetails
