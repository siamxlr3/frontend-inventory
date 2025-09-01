import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useGetPaymentQuery, useUpdatePaymentMutation} from "@/redux/feature/paymentAPI/paymentAPI.js";
import axios from "axios";
import {getBaseURL} from "@/utilitis/getBaseURL.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";

const UpdatePayment = () => {

    const {id}=useParams();
    const [updatePayment]=useUpdatePaymentMutation(id)
    const {data}=useGetPaymentQuery()

    const [inputForm, setinputForm]=useState({
        name:'',
        type:'',
        logo:'',
        status:'',
    })

    useEffect(() => {
        if(data?.data){
            const paymentData = data?.data.find(item => item.id.toString() === id);
            if(paymentData){
                setinputForm({
                    name: paymentData.name || '',
                    type: paymentData.type || '',
                    logo: paymentData.logo || '',
                    status: paymentData.status || '',
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
                type:inputForm.type,
                logo:imageUrl,
                status:inputForm.status,
            }
            await updatePayment({id,data}).unwrap()
            alert("payment updated successfully.");
            setinputForm({
                name:'',
                type:'',
                logo:'',
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
                       Update Payment
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        {/* Brand Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Payment Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter payment name"
                                value={inputForm.name}
                                onChange={handleOnChange}
                                name='name'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Payment Type</Label>
                            <Input
                                id="type"
                                placeholder="Enter type"
                                value={inputForm.type}
                                onChange={handleOnChange}
                                name='type'
                            />
                        </div>

                        {/* Logo Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="logo">Brand Logo</Label>
                            <Input
                                onChange={handleOnChange}
                                name='logo'
                                id="logo"
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
                            Update Payment
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdatePayment;