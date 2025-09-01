import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useCreateInvestmentMutation} from "@/redux/feature/investmentAPI/investmentAPI.js";
import axios from "axios";
import {getBaseURL} from "@/utilitis/getBaseURL.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useGetPaymentQuery} from "@/redux/feature/paymentAPI/paymentAPI.js";

const CreateInvestment = () => {
    const {user}=useSelector((state) => state.auth)
    const [createInvestment]=useCreateInvestmentMutation()
    const {data:paymentData}=useGetPaymentQuery()

    const Paymentdata=paymentData?.data || []

    const [inputForm, setinputForm]=useState({
        name:'',
        amount:'',
        description:'',
        image:'',
        deed_image:'',
        status:'',
        user_id:'',
        payment_type_id:''
    })

    const handleOnChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file') {
            setinputForm(prev => ({ ...prev, [`${name}File`]: files[0] }));
        } else {
            setinputForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            let profileUrl = "";
            let deedUrl = "";

            // Upload profile image
            if (inputForm.imageFile) {
                const profileData = new FormData();
                profileData.append("image", inputForm.imageFile);

                const res1 = await axios.post(
                    `${getBaseURL()}/upload/profile`,
                    profileData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                profileUrl = res1.data.urls[0];
            }

            // Upload deed image
            if (inputForm.deed_imageFile) {
                const deedData = new FormData();
                deedData.append("image", inputForm.deed_imageFile);

                const res2 = await axios.post(
                    `${getBaseURL()}/upload/bank`,
                    deedData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                deedUrl = res2.data.urls[0];
            }

            const data={
                name:inputForm.name,
                amount:inputForm.amount,
                description:inputForm.description,
                image:profileUrl,
                deed_image:deedUrl,
                status:inputForm.status,
                user_id:user.id,
                payment_type_id:inputForm.payment_type_id,
            }
            await createInvestment(data).unwrap()
            alert("investment created successfully.");
            setinputForm({
                name:'',
                amount:'',
                description:'',
                image:'',
                deed_image:'',
                status:'',
                user_id:'',
                payment_type_id:''
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
                        Create New Investment
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        {/* Name */}
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
                            <Label htmlFor="name">Amount</Label>
                            <Input
                                id="amount"
                                placeholder="Enteramount"
                                value={inputForm.amount}
                                onChange={handleOnChange}
                                name='amount'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Description</Label>
                            <Input
                                id="description"
                                placeholder="Enteramount"
                                value={inputForm.description}
                                onChange={handleOnChange}
                                name='description'
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

                        <div className="space-y-2">
                            <Label htmlFor="logo">Deed_Image</Label>
                            <Input
                                onChange={handleOnChange}
                                name='deed_image'
                                id="deed_image"
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

                        <div className="space-y-2">
                            <Label htmlFor="status">Payment</Label>
                            <Select
                                value={inputForm.payment_type_id}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "payment_type_id", value}})
                                }
                                name="payment_type_id"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select payment"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Paymentdata.map(payment => (
                                        <SelectItem key={payment.id} value={payment.id.toString()}>
                                            {payment.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Submit Button */}
                        <Button onClick={handleSubmit} type="button" className="w-full mt-4">
                            Create Investment
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateInvestment;