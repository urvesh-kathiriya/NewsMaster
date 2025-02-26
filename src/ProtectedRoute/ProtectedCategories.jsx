import React, { useContext, useEffect } from 'react'
import { UserContext } from '../creactContext/UserInfoContext';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedCategories = ({children}) => {
    const { userName, password } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!userName && !password){
           navigate("/login")
        }

    },[userName,password])

    return children?children:<Outlet/>

}

export default ProtectedCategories
