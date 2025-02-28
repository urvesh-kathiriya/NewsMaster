import './App.css'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Contact from './pages/Contact'
import Detail from './pages/Detail'
import DetailPost from './pages/DetailPost'
import Footer from './component/Footer'
import Login from "./LoginSingUp/Login"
import UserDetails from './UserProfiles/UserDetails'
import { Routes, Route, useNavigate } from "react-router-dom";
import { SearchProvider } from './creactContext/SearchContext'
import { ThemeProvider } from './creactContext/DarkLightContext'
import { useLocation } from 'react-router-dom'
import { UserProvider } from './creactContext/UserInfoContext'
import SignUp from './LoginSingUp/SignUp'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import TanStackQueryApi from './FethUsingTanStckQuery/TanStackQueryApi'
import Pagination from './pages/Pagination'
import ProtectedCategories from './ProtectedRoute/ProtectedCategories'
import Page404 from "./PageNotFound/Page404"
import SearchNews from './pages/SearchNews'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const location = useLocation()
  const hideNavbarFooter = location.pathname === "/login"
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools  />  devtool */}
        <ThemeProvider>
          <UserProvider>
            <SearchProvider>
              {!hideNavbarFooter && <Navbar />}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<ProtectedCategories />}>
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/SearchNews" element={<SearchNews />} />
                <Route path="/Detail/:id" element={<Detail />} />
                <Route path="/postDetail/:id" element={<DetailPost />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/userDetail" element={<UserDetails />} />
                <Route path="/tanstackqueryapi" element={<TanStackQueryApi />} />
                <Route path="/pagination" element={<Pagination />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
              {!hideNavbarFooter && <Footer />}
            </SearchProvider>
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App