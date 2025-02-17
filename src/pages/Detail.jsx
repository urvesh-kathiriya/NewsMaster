import React, { useEffect } from 'react';
import logo from "../assets/logo.png";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const Detail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const news = location.state?.news;

    if (!news) {
        return <p className="text-center text-lg">News not found.</p>;
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
        toast(`${news.source.name || "Unknown Author"} !`, {
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
                onClick={() => navigate("/")}
            >
                <AiOutlineHome size={24} />
            </button>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-700 text-white shadow-lg rounded-lg overflow-hidden p-4">

                <div className="w-full h-full">
                    <img
                        className="w-full h-full object-cover rounded-lg drop-shadow-2xl"
                        alt="News"
                        src={news.urlToImage || logo}
                    />
                </div>


                <div className="flex flex-col justify-between p-4 space-y-4">

                    <p className="text-white font-medium">
                        <span className="font-semibold">Author:</span> {news.author || "Unknown"}
                    </p>


                    <h1 className="text-2xl font-bold">{news.title}</h1>


                    <p className="text-white">{news.description || "No description available."}</p>


                    <p className="text-white text-sm">
                        {moment(news.publishedAt).format("DD-MMMM-YYYY (dddd) HH:mm A")}
                    </p>


                    <a
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-medium underline"
                    >
                        Read Full Article
                    </a>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Detail;
