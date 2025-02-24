import React, { useState, useEffect, useContext,  } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { HashLoader } from "react-spinners";
import { ArrowUp } from "lucide-react";
import { getMentioningApple, getTechCrunch, getTesla, getTopHeadline, getWallStreet } from "../services/GetService";
import logo from "../assets/logo.png";
import { UserContext } from "../creactContext/UserInfoContext";


const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const text = "lease select a category";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const typingSpeed = 125;
  const pauseTime = 1500;
  const { userName, password } = useContext(UserContext);


  const styles = {
    fontSize: "16px",
    fontWeight: "bold",
    padding: "12px 20px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  };

  useEffect(() => {
    if (index <= text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, index));
        setIndex(index + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {

      const resetTimeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, pauseTime);

      return () => clearTimeout(resetTimeout);
    }
  }, [index]);

  useEffect(() => {
    toast("Categories Time!", {
      type: "success",
      position: "bottom-right",
      autoClose: 3000,
      style: styles,
    });
  }, []);
  
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        let response;
        if (selectedCategory === "Top Headlines Of Country") {
          response = await getTopHeadline();
        } else if (selectedCategory === "Top Headlines Of TechCrunch") {
          response = await getTechCrunch();
        } else if (selectedCategory === "Mentioning Apple") {
          response = await getMentioningApple();
        } else if (selectedCategory === "News About Tesla") {
          response = await getTesla();
        } else if (selectedCategory === "Wall Street News") {
          response = await getWallStreet();
        }


        setNewsData(response?.data?.articles || []);
      } catch (err) {
        setError(err.message);
        setTimeout(()=> navigate(0),1500)
      } finally {
        setLoading(false);
        setTimeout(() => setAnimate(true), 500);
        if (selectedCategory) {
          toast(`${selectedCategory} Categories Time!`, {
            type: "success",
            position: "bottom-right",
            autoClose: 3000,
            style: styles,
          });
        }
      }
    };

    fetchNews();
  }, [selectedCategory]);
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
  const handleDtetail = (index, news) => {
    return userName && password ? navigate(`/Detail/${index}`, { state: { news } }) : navigate("/login")
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><HashLoader color="#1fcb7c" size={75} /></div>;
  if (error) return <p className="text-center text-red-500">{`${selectedCategory} News Not Found! `}</p>;


  return (
    <div className="flex flex-col items-center justify-stat min-h-screen">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="p-2 border rounded-md shadow-md text-lg"
      >
        <option value="" disabled hidden>Choose a category</option>
        <option value="Top Headlines Of Country">Top Headlines Of Country</option>
        <option value="Top Headlines Of TechCrunch">Top Headlines Of TechCrunch</option>
        <option value="Mentioning Apple">Mentioning Apple</option>
        <option value="News About Tesla">News About Tesla</option>
        <option value="Wall Street News">Wall Street News</option>
      </select>
      {!selectedCategory ?
        <div>
          <h1 className="text-3xl text-center p-4 text-gray-600">P{displayedText}</h1>
          <img src={logo} alt="NewMaster" loading="lazy"
          />
        </div>
        :
        <div>
          <p className="mt-4 text-lg font-semibold">
            Selected Category: <span className="text-blue-600">{selectedCategory}</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-7" >
            {newsData?.map((news, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-black bg-white border shadow-lg drop-shadow-2xl rounded-2xl p-5"
                onClick={() => { handleDtetail(index, news) }}
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
            ))}
            <button
              onClick={scrollToTop}
              className={`fixed bottom-10 left-5 border-2  text-black p-2 !rounded-full shadow-2xl transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
                }`}
            >
              <ArrowUp className="w-6 h-6" />
            </button>

          </div>

        </div>

      }

      <ToastContainer />
    </div>
  );
};

export default Categories;
