import React, { useContext, useState } from 'react'
import logo from "../assets/logo.png"
import { AiOutlineHome } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import loginimage from "../assets/loginimage.png"
import { toast, ToastContainer } from 'react-toastify'
import { UserContext } from '../creactContext/UserInfoContext'
import { Eye, EyeOff } from "lucide-react";




const Login = () => {
    const Navigate = useNavigate();
    const { userName, setUsername, password, setPassword } = useContext(UserContext)
    const [showPassword, setShowPassword] = useState(false);

    const handleUsername = (e) => {
        setUsername(e);
    }
    const handlePassword = (e) => {
        setPassword(e);
    }
    const styles = {
        fontSize: "16px",
        fontWeight: "bold",
        padding: "12px 20px",
        borderRadius: "8px",
        width: "300px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        return userName && password ? (
            Navigate("/"),
            toast(`${userName}Login Successfully!`, { type: "success", position: "bottom-right", autoClose: 3000, style: styles })

        )
            :
            (
                Navigate("/login"),
                toast("Fill The UserName & Password!", { type: "error", position: "bottom-right", autoClose: 3000, style: styles })

            )

    }


    return (
        <div className="h-screen bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: `url(${loginimage})` }}>
            <button
                className="mb-4  px-3 py-2 text-white w-12 h-12 ! items-center justify-center box-shadow-gray-950"
                onClick={() => Navigate("/")}
            >
                <AiOutlineHome size={24} />
            </button>
            <div className="h-screen flex flex-col items-center justify-center">
                <div className="p-8 bg-white/5 backdrop-blur rounded-xl shadow-lg w-96 text-center ">
                    <h2 className="text-2xl font-bold mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full p-2 mb-4 border rounded"
                            autoComplete="username"
                            onChange={(e) => { handleUsername(e.target.value) }}
                        />
                       
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full p-2 mb-4 border rounded"
                                autoComplete="current-password"
                                onChange={(e) => { handlePassword(e.target.value) }}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center mb-4"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <button className="w-full text-black py-2 rounded transition">
                            Login in
                        </button>

                    </form>

                </div>
                <button className="w-full text-black py-2 p-2 rounded transition" onClick={() => { Navigate("/singup") }}>
                    Sing Up
                </button>
            </div>
            <ToastContainer />
        </div>

    )
}

export default Login
