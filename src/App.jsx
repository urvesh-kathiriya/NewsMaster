import './App.css'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Contact from './pages/Contact'
import { Routes, Route, useNavigate } from "react-router-dom";
import Detail from './pages/Detail'
import Footer from './component/Footer'
import { SearchProvider } from './creactContext/SearchContext'
import { ThemeProvider } from './creactContext/DarkLightContext'
function App() {


  return (
    <>
      <ThemeProvider>
        <SearchProvider>
          <Navbar />
          <div className="p-15">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/Detail/:id" element={<Detail />} />
            </Routes>
          </div>
          <Footer />
        </SearchProvider>
      </ThemeProvider>
    </>
  )
}

export default App
