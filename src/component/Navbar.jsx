import logo from "../assets/logo.png";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation, redirect } from "react-router-dom";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../creactContext/SearchContext";
import { ThemeContext } from "../creactContext/DarkLightContext";
import { UserContext } from "../creactContext/UserInfoContext";
import { ToastContainer, toast } from 'react-toastify';
import { useQuery } from "@tanstack/react-query";
import { getTopHeadlinUsingTanStackQuery } from "../services/GetService";



const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const { search, setSearch } = useContext(SearchContext);
    const [suggestions, setSuggestions] = useState([]);
    const { userName, setUsername, password, setPassword } = useContext(UserContext);
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const styles = {
        fontSize: "16px",
        fontWeight: "bold",
        padding: "12px 20px",
        borderRadius: "8px",
        width: "300px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    }

    const { data } = useQuery({
        queryKey: ["news"],
        queryFn: () => getTopHeadlinUsingTanStackQuery(),
    })


    const companyNames = [...new Set(data?.map((item) => item.source.name))];

    const handlesearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value.length === 0) {
            setSuggestions(companyNames);
        }

        if (value.length > 0) {
            const filteredSuggestions = companyNames.filter((name) =>
                name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        }

    };

    const toggleTheme = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode; // Toggle dark mode state
            if (newMode) {
                document.documentElement.classList.add("dark"); // Apply dark mode
            } else {
                document.documentElement.classList.remove("dark"); // Remove dark mode
            }
            localStorage.setItem("darkMode", newMode); // Save theme preference
            return newMode;
        });
    };
    const userAvtar = (name) => (name ? name.charAt(0).toUpperCase() : "?");

    const reDirect = (path) => {
        return userName && password && path === "/login" ?
            (
                setSearch(""),
                setUsername(""),
                setPassword(""),
                toast(`${userName} LogOut SucessFully`, { type: "info", position: "bottom-right", autoClose: 3000, style: styles })

            )
            :
            (
                navigate(path),
                setSearch("")
            )
    }
    const getButtonClasses = (path) => {
        return location.pathname === path
            ? "mx-4 py-1 text-blue-600 font-semibold"
            : "mx-4 py-1 text-black hover:text-blue-600";
    };


    return (
        <nav className=" bg-white p-6 dark:text-gray-200  dark:bg-red-900 "
        >

            <div className="container mx-auto flex justify-between items-center px-4">
                <button onClick={() => reDirect("/")} >
                    <img src={logo} alt="Logo" className="h-12 w-auto" loading="lazy"
                    />
                </button>

                {userName && password &&
                    <button className="flex justify-center items-center gap-2 border-2  rounded-l-3xl bg-amber-300" onClick={() => { reDirect("/userDetail") }}>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-400 text-gray-600 font-bold text-lg" >
                            {userAvtar(userName)}
                        </div>
                        <p className="mr-2 ">{userName}</p>
                    </button>

                }

                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>


                <div className="relative hidden md:flex space-x-8 shadow-lg rounded-full p-2 ">
                    <button onClick={() => reDirect("/")} className={getButtonClasses("/")}>Home</button>
                    <button onClick={() => reDirect("/categories")} className={getButtonClasses("/categories")}>
                        Categories
                    </button>
                    <button onClick={() => reDirect("/contact")} className={getButtonClasses("/contact")}>
                        Contact
                    </button>
                </div>


                <div className="flex gap-12 items-center">
                    <div className="hidden md:block relative ">
                        <input
                            type="text"
                            value={search}
                            onChange={handlesearch}
                            onBlur={() => setTimeout(() => setSuggestions([]), 200)}
                            onFocus={() => setSuggestions(companyNames)}
                            placeholder="Search by News..."
                            className="px-4 py-1  rounded-lg border border-gray-300 text-black focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        {suggestions.length > 0 && (
                            <ul className="w-96 absolute left-0 top-full z-50 bg-gray-800 text-cyan-200 border  grid grid-cols-3 gap-2 shadow-lg p-2">
                                <p  className=" col-span-3 flex justify-center items-center gap-2 border rounded-2xl p-2 hover:bg-gray-200 hover:text-amber-800 ">Company Name ... </p>

                                {suggestions.map((name, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-gray-200 hover:text-amber-800 shadow-2xl cursor-pointer border rounded"
                                        onMouseDown={() => setSearch(name)}
                                    >
                                        {name}
                                    </li>
                                ))}

                            </ul>
                        )}
                    </div>
                    <div className="p-2 flex items-center w-5 h-5">
                        <button onClick={toggleTheme} className=" text-xl text-gray-900 dark:text-gray-200">
                            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className={darkMode ? "text-yellow-500" : "text-gray-500"} />
                        </button>
                    </div>
                    {!userName && !password &&
                        <button onClick={() => reDirect("/login")} className="flex items-center gap-2 px-4 py-2 rounded-lg text-black  transition">
                            <LogIn size={20} />

                        </button>
                    }
                    {userName && password &&
                        <button onClick={() => reDirect("/login")} className="flex items-center gap-2 px-4 py-2 rounded-lg  text-black transition">
                            <LogOut size={20} />

                        </button>
                    }

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
            <ToastContainer />
        </nav>
    );
};

export default Navbar;
