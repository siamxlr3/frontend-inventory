import React, { useState } from "react";
import { useLoginUserMutation } from "@/redux/feature/authAPI/authAPI.js";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import {setUser} from "@/redux/feature/authAPI/authSlice.jsx";

const Login = () => {
    const [loginUser] = useLoginUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputForm, setinputForm]=useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setinputForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const data={
                email:inputForm.email,
                password: inputForm.password,
            }
           const response=await loginUser(data).unwrap()
            const {user}=response;
            dispatch(setUser({user}))
            navigate('/')
            setinputForm({
                email: "",
                password: "",
            })
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-xl font-bold mb-4 text-center">User Login</h2>

                <form onSubmit={handleSubmit} className="space-y-3">

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={inputForm.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={inputForm.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Login;
