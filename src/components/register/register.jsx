import React, { useState } from "react";
import { useCreateUserMutation } from "@/redux/feature/authAPI/authAPI.js";
import axios from "axios";
import {getBaseURL} from "@/utilitis/getBaseURL.js";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();
    const [createUser] = useCreateUserMutation();

    const [inputForm, setinputForm]=useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        contact: "",
        image: "",
        role_name: "",
        permission: "",
        status: "",
    });


    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file') {
            setinputForm(prev => ({ ...prev, imageFile: files[0] }));
        } else {
            setinputForm(prev => ({ ...prev, [name]: value }));
        }
    };


    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            let imageUrl = "";

            if (inputForm.imageFile) {
                const formData = new FormData();
                formData.append("image", inputForm.imageFile);

                const imageUploadResponse = await axios.post(`${getBaseURL()}/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                imageUrl = imageUploadResponse.data.url;
            }
            const data={
                name: inputForm.name,
                email:inputForm.email,
                password: inputForm.password,
                gender: inputForm.gender,
                contact: inputForm.contact,
                image: imageUrl,
                role_name: inputForm.role_name,
                permission: inputForm.permission,
                status: inputForm.status,
            }
            await createUser(data).unwrap()
            alert("user register successfully.");
            navigate('/login')
            setinputForm({
                name: "",
                email: "",
                password: "",
                gender: "",
                contact: "",
                image: "",
                role_name: "",
                permission: "",
                status: "",
            })
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-xl font-bold mb-4 text-center">User Registration</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={inputForm.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />

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

                    <select
                        name="gender"
                        value={inputForm.gender}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    <input
                        type="text"
                        name="contact"
                        placeholder="Contact Number"
                        value={inputForm.contact}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />

                    <input
                        type="file"
                        name="image"
                        placeholder="Image URL"
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />

                    <input
                        type="text"
                        name="role_name"
                        placeholder="Role Name"
                        value={inputForm.role_name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />

                    <input
                        type="text"
                        name="permission"
                        placeholder="Permission"
                        value={inputForm.permission}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />

                    <select
                        name="status"
                        value={inputForm.status}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                       Register
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Register;
