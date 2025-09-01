import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useGetSupplierQuery, useUpdateSupplierMutation} from "@/redux/feature/supplierAPI/supplierAPI.js";
import axios from "axios";
import {getBaseURL} from "@/utilitis/getBaseURL.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";

const UpdateSupplier = () => {

    const {id}=useParams();
    const [deleteSupplier]=useUpdateSupplierMutation()
    const {data}=useGetSupplierQuery()

    const [inputForm, setinputForm]=useState({
        name:'',
        shop_name:'',
        address:'',
        contact:'',
        email:'',
        image:'',
        status:'',
    })

    useEffect(() => {
        if(data?.data){
            const supplierData = data?.data.find(item => item.id.toString() === id);
            if(supplierData){
                setinputForm({
                    name: supplierData.name || '',
                    shop_name: supplierData.shop_name || '',
                    address: supplierData.address || '',
                    contact: supplierData.contact || '',
                    email: supplierData.email || '',
                    image: supplierData.image || '',
                    status: supplierData.status || '',
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
                shop_name:inputForm.shop_name,
                address:inputForm.address,
                contact:inputForm.contact,
                email:inputForm.email,
                image:imageUrl,
                status:inputForm.status,
            }
            await deleteSupplier({id,data}).unwrap()
            alert("supplier updated successfully.");
            setinputForm({
                name:'',
                shop_name:'',
                address:'',
                contact:'',
                email:'',
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
                      Update Supplier
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        {/* Brand Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Supplier Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter supplier name"
                                value={inputForm.name}
                                onChange={handleOnChange}
                                name='name'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Shop_Name</Label>
                            <Input
                                id="shop_name"
                                placeholder="Enter shop_name"
                                value={inputForm.shop_name}
                                onChange={handleOnChange}
                                name='shop_name'
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
                            Update Supplier
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateSupplier;