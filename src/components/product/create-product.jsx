import React, {useState} from 'react';
import {useCreateProductMutation} from "@/redux/feature/productAPI/productAPI.js";
import {useSelector} from "react-redux";
import axios from "axios";
import {getBaseURL} from "@/utilitis/getBaseURL.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useGetBrandQuery} from "@/redux/feature/brandAPI/brandAPI.js";
import {useGetCategoryQuery} from "@/redux/feature/categoryAPI/categoryAPI.js";

const CreateProduct = () => {
    const {user}=useSelector((state) => state.auth);
    const [createProduct]=useCreateProductMutation()
    const {data:brandData}=useGetBrandQuery()
    const {data:Categorydata}=useGetCategoryQuery()

    const Branddata=brandData?.data || []
    const categoryData=Categorydata?.data || []

    const [inputForm, setinputForm]=useState({
        name:'',
        description:'',
        quantity:'',
        brand_id:'',
        category_id:'',
        user_id:'',
        image:'',
        status:'',
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
                description:inputForm.description,
                quantity:inputForm.quantity,
                brand_id:inputForm.brand_id,
                category_id:inputForm.category_id,
                user:user.id,
                image:imageUrl,
                status:inputForm.status,
            }
            await createProduct(data).unwrap()
            alert("product created successfully.");
            setinputForm({
                name:'',
                description:'',
                quantity:'',
                brand_id:'',
                category_id:'',
                user_id:'',
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
                        Create New Product
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        {/* Brand Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter product name"
                                value={inputForm.name}
                                onChange={handleOnChange}
                                name='name'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Product Description</Label>
                            <Input
                                id="name"
                                placeholder="Enter product description"
                                value={inputForm.description}
                                onChange={handleOnChange}
                                name='description'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Product Quantity</Label>
                            <Input
                                id="quantity"
                                placeholder="Enter product quantity"
                                value={inputForm.quantity}
                                onChange={handleOnChange}
                                name='quantity'
                            />
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="status">Category</Label>
                            <Select
                                value={inputForm.category_id}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "category_id", value}})
                                }
                                name="category_id"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {categoryData.map(category => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Brand</Label>
                            <Select
                                value={inputForm.brand_id}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "brand_id", value}})
                                }
                                name="brand_id"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select brand"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Branddata.map(brand => (
                                        <SelectItem key={brand.id} value={brand.id.toString()}>
                                            {brand.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Logo Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="logo">Product Image</Label>
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
                            Create Product
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateProduct;