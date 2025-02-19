import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../creactContext/SearchContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


const SearchNews = ({ newsData }) => {
  const { search } = useContext(SearchContext);
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [notice,setNotice] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 500);
  }, []);

  const styles = {
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 20px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const filteredNews = newsData.filter((news) =>
    Object.values(news)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );



  useEffect(() => {
    if (filteredNews.length === 0) {
      const id = toast.error(`${search} News Not Found`, {
        position: "bottom-right",
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false, 
        draggable: true,
        progress: undefined,
        style: styles,
      });
  
      setTimeout(() => {
        toast.dismiss(id); 
      }, 3000);
    }
  }, [filteredNews]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-7">
      {filteredNews.length > 0 ? (
        filteredNews.map((news, index) => (

          <div
            key={index}
            className="flex flex-col items-center text-black bg-white border shadow-lg drop-shadow-2xl rounded-2xl p-5"
            onClick={() => navigate(`/Detail/${index}`, { state: { news } })}
            >
            <img
              className="size-72 object-cover rounded-md drop-shadow-xl"
              alt="News"
              src={news.urlToImage || logo}
              loading="lazy"
              />
            <div className={`w-full h-[2px] bg-red-600 ${animate ? "line-animation" : ""} mt-4`}></div>
            <div className="flex flex-col items-center text-center mt-4">
              <span className="text-2xl font-medium">{news.title}</span>
              <span className="text-gray-400 text-sm mt-2">
                {moment(news.publishedAt).format("DD-MMMM-YYYY (dddd) HH:mm A")}
              </span>
            </div>
          </div>
      
        ))
      ) : (
        <div className=" flex flex-col justify-start items-center">
          
          <h1 className="text-3xl text-center p-4 text-gray-600">No Results Found.</h1>
          <img src={logo} alt="" loading="lazy"/>
          
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default SearchNews;
