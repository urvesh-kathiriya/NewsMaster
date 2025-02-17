import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import logo from "../assets/logo.png";
import "../App.css";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { ArrowUp, Search } from "lucide-react";
import { getTopHeadline } from "../services/GetService";
import { SearchContext } from "../creactContext/SearchContext";
import SearchNews from "./SearchNews";
import { UserContext } from "../creactContext/UserInfoContext";




const Home = () => {

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animate, setAnimate] = useState(false);
  const { search } = useContext(SearchContext);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { userName, password } = useContext(UserContext);

  const styles = {
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 20px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  }

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getTopHeadline();
        setNewsData(response.data.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setTimeout(() => setAnimate(true), 500);
        toast("Time To News!", { type: "success", position: "bottom-right", autoClose: 3000, style: styles });
      }
    };

    fetchNews();
  }, []);
  useEffect(() => {
    const toggleVisibility = () => {
      const scrollFromTop = window.scrollY;
      const scrollFromBottom = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY);
      if (scrollFromTop > 600 && scrollFromBottom > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleDtetail = (index,news) => {
    return userName && password ?navigate(`/Detail/${index}`, { state: { news } }):navigate("/login")
  };


  if (loading) return <div className="flex justify-center items-center h-screen"><HashLoader color="#1fcb7c" size={75} /></div>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      {search ? <div>
        <SearchNews newsData={newsData} />
      </div>
        :
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-7" >
          {newsData.map((news, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-black bg-white border shadow-lg drop-shadow-2xl rounded-2xl p-5"
              onClick={()=>{handleDtetail(index,news)}}
            >

              <img
                className="size-72 object-cover rounded-md drop-shadow-xl"
                alt="News"
                src={news.urlToImage || logo}
              />



              <div className={`w-full h-[2px] bg-red-600 ${animate ? "line-animation" : ""} mt-4`}></div>


              <div className="flex flex-col items-center text-center mt-4">
                <span className="text-2xl font-medium">{news.title}</span>
                <span className="text-gray-400 text-sm mt-2">
                  {moment(news.publishedAt).format("DD-MMMM-YYYY (dddd) HH:mm A")}
                </span>
              </div>
            </div>
          ))}
          <button
            onClick={scrollToTop}
            className={`fixed bottom-10 left-5 border-2  text-black p-2 !rounded-full shadow-2xl transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
              }`}
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </div>
        }
      <ToastContainer />

    </div>
  );
};

export default Home;
