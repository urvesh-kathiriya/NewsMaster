import React, { useEffect } from 'react';
import logo from "../assets/logo.png";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const DetailPost = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const posts = location.state?.posts;

    if (!posts) {
        return <p className="text-center text-lg">posts not found.</p>;
    }

    const styles = {
        fontSize: "16px",
        fontWeight: "bold",
        padding: "12px 20px",
        borderRadius: "8px",
        width: "300px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    };

    useEffect(() => {
        toast(`${posts.name || "Unknown Author"} !`, {
            type: "success",
            position: "bottom-right",
            autoClose: 3000,
            style: styles
        });
        
    }, []);

    return (
        <div className="container mx-auto p-6">

            <button
                className="mb-4 bg-gray-500 px-3 py-2 text-white w-12 h-12 !rounded-full flex items-center justify-center box-shadow-gray-950"
                onClick={() => navigate("/tanstackqureyapi")}
            >
                <AiOutlineHome size={24} />
            </button>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-700 text-white shadow-lg rounded-lg overflow-hidden p-4">

                <div className="w-full h-full">
                    <img
                        className="w-full h-full object-cover rounded-lg drop-shadow-2xl"
                        alt="posts"
                        src={posts.image || logo}
                        loading="lazy"
                    />
                </div>


                <div className="flex flex-col justify-between p-4 space-y-4">

                    <p className="text-white font-medium">
                        <span className="font-semibold">Name : </span> {posts.name || "Unknown"}
                    </p>


                    <h1 className="text-2xl font-bold">Company : {posts.company}</h1>
                    <h1 className="text-2xl font-bold text-emerald-600">Price : {posts.price}</h1>


                    <p className="text-white">{posts.description || "No description available."}</p>

                    
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default DetailPost;
