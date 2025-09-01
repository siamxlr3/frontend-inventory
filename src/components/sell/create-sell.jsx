import React, {useState} from 'react';
import {useCreateSellMutation} from "@/redux/feature/sellAPI/sellAPI.js";
import {useSelector} from "react-redux";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useGetCustomerQuery} from "@/redux/feature/customerAPI/customerAPI.js";
import {useGetQuery} from "@/redux/feature/retailcustomerAPI/retailcustomerAPI.js";

const CreateSell = () => {

    const {user}=useSelector((state) => state.auth)
    const [createSell]=useCreateSellMutation()
    const {data:customerData}=useGetCustomerQuery()
    const {data:retailcustomerData}=useGetQuery()

    const Customerdata=customerData?.data || []
    const Retailcustomerdata=retailcustomerData?.data || []

    const [inputForm, setinputForm]=useState({
        total_amount:'',
        paid_amount:'',
        due_amount:'',
        total_profit:'',
        discount:'',
        net_profit:'',
        status:'',
        user_id:'',
        customer_id:'',
        retail_customer:''
    })

    const handleOnChange = (e) => {
        const { name, value} = e.target;
        setinputForm({
            ...inputForm,
            [name]:value
        })
    };

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const data={
                total_amount:inputForm.total_amount,
                paid_amount:inputForm.paid_amount,
                due_amount:inputForm.due_amount,
                total_profit:inputForm.total_profit,
                discount:inputForm.discount,
                net_profit:inputForm.net_profit,
                status:inputForm.status,
                user_id:user.id,
                customer_id:inputForm.customer_id,
                retail_customer:inputForm.retail_customer,
            }
            await createSell(data).unwrap()
            alert("sell created successfully.");
            setinputForm({
                total_amount:'',
                paid_amount:'',
                due_amount:'',
                total_profit:'',
                discount:'',
                net_profit:'',
                status:'',
                user_id:'',
                customer_id:'',
                retail_customer:''
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
                        Create New Sell
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="name">Total-Amount</Label>
                            <Input
                                id="total_amount"
                                placeholder="Enter total_amount"
                                value={inputForm.total_amount}
                                onChange={handleOnChange}
                                name='total_amount'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Paid_Amount</Label>
                            <Input
                                id="paid_amount"
                                placeholder="Enter paid_amount"
                                value={inputForm.paid_amount}
                                onChange={handleOnChange}
                                name='paid_amount'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Due_Amount</Label>
                            <Input
                                id="due_amount"
                                placeholder="Enter due_amount"
                                value={inputForm.due_amount}
                                onChange={handleOnChange}
                                name='due_amount'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Total_Profit</Label>
                            <Input
                                id="total_profit"
                                placeholder="Enter total_profit"
                                value={inputForm.total_profit}
                                onChange={handleOnChange}
                                name='total_profit'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Discount</Label>
                            <Input
                                id="discount"
                                placeholder="Enter discount"
                                value={inputForm.discount}
                                onChange={handleOnChange}
                                name='discount'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Net_Profit</Label>
                            <Input
                                id="net_profit"
                                placeholder="Enter net_profit"
                                value={inputForm.net_profit}
                                onChange={handleOnChange}
                                name='net_profit'
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
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="unpaid">Unpaid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Customer</Label>
                            <Select
                                value={inputForm.customer_id}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "customer_id", value}})
                                }
                                name="customer_id"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select customer"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Customerdata.map(customer => (
                                        <SelectItem key={customer.id} value={customer.id.toString()}>
                                            {customer.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Retail Customer</Label>
                            <Select
                                value={inputForm.retail_customer}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "retail_customer", value}})
                                }
                                name="retail_customer"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select retail customer"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Retailcustomerdata.map(retail => (
                                        <SelectItem key={retail.id} value={retail.id.toString()}>
                                            {retail.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Submit Button */}
                        <Button onClick={handleSubmit} type="button" className="w-full mt-4">
                            Create Sell
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateSell;