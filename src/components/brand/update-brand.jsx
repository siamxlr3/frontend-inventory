import React, {useEffect, useState} from 'react';
import {useGetBrandQuery, useUpdateBrandMutation} from "@/redux/feature/brandAPI/brandAPI.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";
import axios from "axios";
import {getBaseURL} from "@/utilitis/getBaseURL.js";
import {useParams} from "react-router-dom";


const UpdateBrand = () => {

    const {id}=useParams();
    const [updateBrand]=useUpdateBrandMutation(id)
    const {data,refetch}=useGetBrandQuery()

    const [inputForm, setinputForm]=useState({
        name:'',
        logo:'',
        status:'',
    })

    useEffect(() => {
        if(data?.data){
            const brandData = data?.data.find(item => item.id.toString() === id);
            if(brandData){
                setinputForm({
                    name: brandData.name || '',
                    logo: brandData.logo || '',
                    status: brandData.status || '',
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
                logo:imageUrl,
                status:inputForm.status,
            }
            await updateBrand({id,data}).unwrap()
            alert("brand update successfully.");
            await refetch()
            setinputForm({
                name:'',
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
                       Update Brand
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        {/* Brand Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Brand Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter brand name"
                                value={inputForm.name}
                                onChange={handleOnChange}
                                name='name'
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
                                    <SelectItem value="active">active</SelectItem>
                                    <SelectItem value="inactive">inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Submit Button */}
                        <Button onClick={handleSubmit} type="button" className="w-full mt-4">
                            Update Brand
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateBrand;