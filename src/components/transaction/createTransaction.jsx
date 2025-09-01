import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useCreateTracnsactionMutation} from "@/redux/feature/transactionAPI/transactionAPI.js";
import {useGetPaymentQuery} from "@/redux/feature/paymentAPI/paymentAPI.js";
import {useGetExpenseQuery} from "@/redux/feature/expenseAPI/expenseAPI.js";
import {useGetStockQuery} from "@/redux/feature/stockAPI/stockAPI.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";

const CreateTransaction = () => {
    const {user}=useSelector((state)=>state.auth)
    const [createTracnsaction]=useCreateTracnsactionMutation()

    const {data:paymentData}=useGetPaymentQuery()
    const {data:expenseData}=useGetExpenseQuery()
    const {data:stockData}=useGetStockQuery()

    const Paymentdata=paymentData?.data || []
    const Expensedata=expenseData?.data || []
    const Stockdata=stockData?.data || []

    const [inputForm, setinputForm]=useState({
        type:"",
        stock_id:'',
        expense_id:'',
        payment_type_id:'',
        others:'',
        comment:'',
        amount:'',
        status:'',
        user_id:'',
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
                type:inputForm.type,
                stock_id:inputForm.stock_id,
                expense_id:inputForm.expense_id,
                payment_type_id:inputForm.payment_type_id,
                others:inputForm.others,
                comment:inputForm.comment,
                amount:inputForm.amount,
                status:inputForm.status,
                user_id:user.id,
            }
            await createTracnsaction(data).unwrap()
            alert("transaction created successfully.");
            setinputForm({
                type:"",
                stock_id:'',
                expense_id:'',
                payment_type_id:'',
                others:'',
                comment:'',
                amount:'',
                status:'',
                user_id:'',
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
                        Create New Transaction
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="status">Type</Label>
                            <Select
                                value={inputForm.type}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "type", value}})
                                }
                                name="type"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="in">In</SelectItem>
                                    <SelectItem value="out">Out</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Others</Label>
                            <Input
                                id="others"
                                placeholder="Enter others"
                                value={inputForm.others}
                                onChange={handleOnChange}
                                name='others'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Comment</Label>
                            <Input
                                id="comment"
                                placeholder="comment"
                                value={inputForm.comment}
                                onChange={handleOnChange}
                                name='comment'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Amount</Label>
                            <Input
                                id="amount"
                                placeholder="amount"
                                value={inputForm.amount}
                                onChange={handleOnChange}
                                name='amount'
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
                                value={inputForm.expense_id}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "expense_id", value}})
                                }
                                name="expense_id"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select expense"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Expensedata.map(expense => (
                                        <SelectItem key={expense.id} value={expense.id.toString()}>
                                            {expense.id}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Stock</Label>
                            <Select
                                value={inputForm.stock_id}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "stock_id", value}})
                                }
                                name="stock_id"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select stock"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Stockdata.map(stock => (
                                        <SelectItem key={stock.id} value={stock.id.toString()}>
                                            {stock.id}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Submit Button */}
                        <Button onClick={handleSubmit} type="button" className="w-full mt-4">
                            Create Transaction
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateTransaction;