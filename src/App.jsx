import './App.css'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Contact from './pages/Contact'
import Detail from './pages/Detail'
import Footer from './component/Footer'
import Login from "./LoginSingUp/Login"
import UserDetails from './UserProfiles/UserDetails'
import { Routes, Route, useNavigate } from "react-router-dom";
import { SearchProvider } from './creactContext/SearchContext'
import { ThemeProvider } from './creactContext/DarkLightContext'
import { useLocation } from 'react-router-dom'
import { UserProvider } from './creactContext/UserInfoContext'
import SingUp from './LoginSingUp/SingUp'
function App() {
  const location = useLocation()
  const hideNavbarFooter = location.pathname === "/login"
  const padding = () => {
    return hideNavbarFooter ? "" : "p-15"
  }
  return (
    <>
      <ThemeProvider>
        <UserProvider>
          <SearchProvider>
            {!hideNavbarFooter && <Navbar />}
            <div className={padding()}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/Detail/:id" element={<Detail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/singup" element={<SingUp />} />
                <Route path="/userDetail" element={<UserDetails />} />

              </Routes>
            </div>
            {!hideNavbarFooter && <Footer />}
          </SearchProvider>
        </UserProvider>
      </ThemeProvider>
    </>
  )
}

export default App
