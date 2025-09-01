import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useGetExpenseQuery, useUpdateExpenseMutation} from "@/redux/feature/expenseAPI/expenseAPI.js";
import {useGetPaymentQuery} from "@/redux/feature/paymentAPI/paymentAPI.js";
import {useGetExpenseCategoriesQuery} from "@/redux/feature/expensecategoriesAPI/expensecategoriesAPI.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useSelector} from "react-redux";

const UpdateExpense = () => {
    const {user}=useSelector((state) => state.auth)
    const {id}=useParams();
    const [updateExpense]=useUpdateExpenseMutation(id)
    const {data}=useGetExpenseQuery()

    const {data:paymentData}=useGetPaymentQuery()
    const {data:expenseData}=useGetExpenseCategoriesQuery()

    const Paymentdata=paymentData?.data || []
    const Expensedata=expenseData?.data || []


    useEffect(() => {
        if(data?.data){
            const expenseData = data?.data.find(item => item.id.toString() === id);
            if(expenseData){
                setinputForm({
                    description: expenseData.description || '',
                    cost: expenseData.cost || '',
                    payment_type_id: expenseData.payment_type_id || '',
                    expense_type_id: expenseData.expense_type_id || '',
                    status: expenseData.status || '',
                });
            }
        }
    }, [data, id]);

    const [inputForm, setinputForm]=useState({
        description:"",
        cost:'',
        payment_type_id:'',
        expense_type_id:'',
        user_id:'',
        status:'',
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
                description:inputForm.description,
                cost:inputForm.cost,
                payment_type_id:inputForm.payment_type_id,
                expense_type_id:inputForm.expense_type_id,
                status:inputForm.status,
                user_id:user.id,
            }
            await updateExpense({id,data}).unwrap()
            alert("expense update successfully.");
            setinputForm({
                description:"",
                cost:'',
                payment_type_id:'',
                expense_type_id:'',
                user_id:'',
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
                       Update Expense
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Description</Label>
                            <Input
                                id="description"
                                placeholder="Enter description"
                                value={inputForm.description}
                                onChange={handleOnChange}
                                name='description'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Cost</Label>
                            <Input
                                id="cost"
                                placeholder="cost"
                                value={inputForm.cost}
                                onChange={handleOnChange}
                                name='cost'
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

                        <div className="space-y-2">
                            <Label htmlFor="status">Expense</Label>
                            <Select
                                value={inputForm.expense_type_id}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "expense_type_id", value}})
                                }
                                name="expense_type_id"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select expense"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Expensedata.map(expense => (
                                        <SelectItem key={expense.id} value={expense.id.toString()}>
                                            {expense.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Submit Button */}
                        <Button onClick={handleSubmit} type="button" className="w-full mt-4">
                            Update Expense
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateExpense;