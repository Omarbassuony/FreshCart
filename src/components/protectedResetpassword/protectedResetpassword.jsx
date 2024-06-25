import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedResetpassword(props){
    
    if(localStorage.getItem("verifyCode")!==null){
        return props.children
    }else
    {
        return <Navigate to={"/login"} />
    }
}