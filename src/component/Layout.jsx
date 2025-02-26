import React from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ hideNavbarFooter,children }) => {
    const location = useLocation();
    const isNotFoundPage = location.pathname === "*" || location.pathname.startsWith("/404");
  
    return isNotFoundPage ? (
      children
    ) : (
      <>
        {!hideNavbarFooter && <Navbar />}
        {children}
        {!hideNavbarFooter && <Footer />}
      </>
    );
  };

export default Layout
