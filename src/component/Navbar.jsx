import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, redirect } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../creactContext/SearchContext";
import { ThemeContext } from "../creactContext/DarkLightContext";


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const { search, setSearch } = useContext(SearchContext);
    const { darkMode, setDarkMode } = useContext(ThemeContext)

    const handlesearch = (e) => {
        setSearch(e.target.value)
    };

    const toggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
      };

    const reDirect=(path)=>{
        navigate(path)
        setSearch("");
    }


    const getButtonClasses = (path) => {
        return location.pathname === path
            ? "mx-4 py-1 text-blue-600 font-semibold"
            : "mx-4 py-1 text-black hover:text-blue-600";
    };

    return (
        <nav className="mt-2 bg-white p-3 dark:text-white dark:bg-gray-900">
            <div className="container mx-auto flex justify-between items-center px-4">
                <button onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                    <img src={logo} alt="Logo" className="h-12 w-auto" />
                </button>


                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>


                <div className="relative hidden md:flex space-x-8 shadow-lg rounded-full p-2 bg-white">
                    <button onClick={() => reDirect("/")} className={getButtonClasses("/")}>Home</button>
                    <button onClick={() => reDirect("/categories")} className={getButtonClasses("/categories")}>
                        Categories
                    </button>
                    <button onClick={() => reDirect("/contact")} className={getButtonClasses("/contact")}>
                        Contact
                    </button>
                </div>


                <div className="flex gap-12">
                    <div className="hidden md:block ">
                        <input
                            type="text"
                            value={search}
                            placeholder="Search..."
                            className="px-4 py-1  rounded-lg border border-gray-300 text-black focus:outline-none focus:ring focus:ring-blue-200"
                            onChange={handlesearch}
                            
                        />

                    </div>
                    <button onClick={toggleTheme} className="ml-4 text-xl text-gray-900 dark:text-gray-200">
                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className={darkMode ? "text-yellow-500" : "text-gray-500"} />
                    </button>
                </div>

            </div>


            {menuOpen && (
                <div className="md:hidden flex flex-col items-center space-y-4 mt-4 bg-white p-4 shadow-lg rounded-lg">
                    <button onClick={() => { navigate("/"); setMenuOpen(false); }} className={getButtonClasses("/")}>Home</button>
                    <button onClick={() => { navigate("/categories"); setMenuOpen(false); }} className={getButtonClasses("/categories")}>
                        Categories
                    </button>
                    <button onClick={() => { navigate("/contact"); setMenuOpen(false); }} className={getButtonClasses("/contact")}>
                        Contact
                    </button>
                </div>
            )}
            <div className="absolute left-3 w-0 h-[2px] bg-gray-500 animate-expand mt-3"></div>
        </nav>
    );
};

export default Navbar;
