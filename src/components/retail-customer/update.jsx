import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useGetQuery, useUpdateMutation} from "@/redux/feature/retailcustomerAPI/retailcustomerAPI.js";
import axios from "axios";
import {getBaseURL} from "@/utilitis/getBaseURL.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";

const Update = () => {

    const {user}=useSelector(state => state.auth);
    const {id} = useParams();
    const [update]=useUpdateMutation(id)
    const {data}=useGetQuery()

    useEffect(() => {
        if(data?.data){
            const customerData = data?.data.find(item => item.id.toString() === id);
            if(customerData){
                setinputForm({
                    name: customerData.name || '',
                    email: customerData.email || '',
                    password: customerData.password || '',
                    contact: customerData.contact || '',
                    address: customerData.address || '',
                    image: customerData.image || '',
                    status: customerData.status || '',
                });
            }
        }
    }, [data, id]);

    const [inputForm, setinputForm]=useState({
        name:'',
        email:'',
        password:'',
        contact:'',
        image:'',
        address:'',
        status:'',
        user_id:''
    })

    const handleOnChange = (e) => {
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
                name:inputForm.name,
                email:inputForm.email,
                password:inputForm.password,
                contact:inputForm.contact,
                image:imageUrl,
                address:inputForm.address,
                status:inputForm.status,
                user_id:user.id,
            }
            await update({id,data}).unwrap()
            alert("retail-customer updated successfully.");
            setinputForm({
                name:'',
                email:'',
                password:'',
                contact:'',
                image:'',
                address:'',
                status:'',
                user_id:''
            })
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="flex justify-center items-center  bg-gray-100 p-6">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-center">
                        Update New Retail-Customer
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="name">Customer Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter customer name"
                                value={inputForm.name}
                                onChange={handleOnChange}
                                name='name'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Email</Label>
                            <Input
                                id="email"
                                placeholder="Enter email"
                                value={inputForm.email}
                                onChange={handleOnChange}
                                name='email'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Password</Label>
                            <Input
                                id="password"
                                placeholder="Enter password"
                                value={inputForm.password}
                                onChange={handleOnChange}
                                name='password'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Contact</Label>
                            <Input
                                id="contact"
                                placeholder="Enter contact"
                                value={inputForm.contact}
                                onChange={handleOnChange}
                                name='contact'
                            />
                        </div>

                        {/* Logo Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="logo">Brand Logo</Label>
                            <Input
                                onChange={handleOnChange}
                                name='image'
                                id="image"
                                type="file"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Address</Label>
                            <Input
                                id="address"
                                placeholder="Enter address"
                                value={inputForm.address}
                                onChange={handleOnChange}
                                name='address'
                            />
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={inputForm.status}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "status", value}})
                                }
                                name="status"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Submit Button */}
                        <Button onClick={handleSubmit} type="button" className="w-full mt-4">
                            Update Customer
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Update;