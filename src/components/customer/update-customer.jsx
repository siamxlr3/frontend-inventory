import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useGetCustomerQuery, useUpdateCustomerMutation} from "@/redux/feature/customerAPI/customerAPI.js";
import axios from "axios";
import {getBaseURL} from "@/utilitis/getBaseURL.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";

const UpdateCustomer = () => {

    const {id}=useParams();
    const [updateCustomer]=useUpdateCustomerMutation(id)
    const {data}=useGetCustomerQuery()

    const [inputForm, setinputForm]=useState({
        name:'',
        email:'',
        contact:'',
        image:'',
        status:'',
    })

    useEffect(() => {
        if(data?.data){
            const customerData = data?.data.find(item => item.id.toString() === id);
            if(customerData){
                setinputForm({
                    name: customerData.name || '',
                    email: customerData.email || '',
                    contact: customerData.contact || '',
                    image: customerData.image || '',
                    status: customerData.status || '',
                });
            }
        }
    }, [data, id]);


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
                contact:inputForm.contact,
                image:imageUrl,
                status:inputForm.status,
            }
            await updateCustomer({id,data}).unwrap()
            alert("customer updated successfully.");
            setinputForm({
                name:'',
                email:'',
                contact:'',
                image:'',
                status:'',
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
                        Update Customer
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        {/* Brand Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter brand name"
                                value={inputForm.name}
                                onChange={handleOnChange}
                                name='name'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Email</Label>
                            <Input
                                id="email"
                                placeholder="Enter Email"
                                value={inputForm.email}
                                onChange={handleOnChange}
                                name='email'
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
                            <Label htmlFor="logo">Image</Label>
                            <Input
                                onChange={handleOnChange}
                                name='image'
                                id="image"
                                type="file"
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

export default UpdateCustomer;