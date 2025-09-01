import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useCreateExpenseMutation} from "@/redux/feature/expenseAPI/expenseAPI.js";
import {useGetPaymentQuery} from "@/redux/feature/paymentAPI/paymentAPI.js";
import {useGetExpenseCategoriesQuery} from "@/redux/feature/expensecategoriesAPI/expensecategoriesAPI.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";


const CreateExpense = () => {
    const {user}=useSelector((state) => state.auth)
    const [createExpense]=useCreateExpenseMutation()

    const {data:paymentData}=useGetPaymentQuery()
    const {data:expenseData}=useGetExpenseCategoriesQuery()

    const Paymentdata=paymentData?.data || []
    const Expensedata=expenseData?.data || []

    const [inputForm, setinputForm]=useState({
        description:"",
        cost:'',
        payment_type_id:'',
        expense_category_id:'',
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
                expense_category_id:inputForm.expense_category_id,
                status:inputForm.status,
                user_id:user.id,
            }
            await createExpense(data).unwrap()
            alert("expense created successfully.");
            setinputForm({
                description:"",
                cost:'',
                payment_type_id:'',
                expense_category_id:'',
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
                        Create New Expense
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
                                value={inputForm.expense_category_id}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "expense_category_id", value}})
                                }
                                name="expense_category_id"
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
                            Create Expense
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateExpense;