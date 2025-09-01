import React from 'react';
import {getToken} from "@/utilitis/sessionHelper.js";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children }) => {

    const token=getToken();

    if(!token){
        alert("Please log in");
        return <Navigate to="/login" replace />;
    }

    return children;

};

export default PrivateRoute;