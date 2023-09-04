// This will prevent authenticated users from accessing this route

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

 const OpenRoute = ({ children }) => {

    const { Token } = useSelector((state) => state.auth);

    if(Token === null){
       return children
    } else{
        return <Navigate to="/dashboard/my-profile" />
    }    
 }

 export default OpenRoute;