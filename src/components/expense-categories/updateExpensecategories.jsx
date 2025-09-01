import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {
    useGetExpenseCategoriesQuery,
    useUpdateExpenseCategoriesMutation
} from "@/redux/feature/expensecategoriesAPI/expensecategoriesAPI.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";

const UpdateExpensecategories = () => {
    const {id}=useParams();
    const [updateExpenseCategories]=useUpdateExpenseCategoriesMutation(id)
    const {data}=useGetExpenseCategoriesQuery()

    const [inputForm, setinputForm]=useState({
        name:'',
        address:'',
        status:'',
    })


    useEffect(() => {
        if(data?.data){
            const expenseData = data?.data.find(item => item.id.toString() === id);
            if(expenseData){
                setinputForm({
                    name: expenseData.name || '',
                    type: expenseData.type || '',
                    status: expenseData.status || '',
                });
            }
        }
    }, [data, id]);

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
                name:inputForm.name,
                address:inputForm.address,
                status:inputForm.status,
            }
            await updateExpenseCategories({id,data}).unwrap()
            alert("WareHouse update successfully.");
            setinputForm({
                name:'',
                address:'',
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
                        Update Expense-Categories
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        {/* Brand Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter house name"
                                value={inputForm.name}
                                onChange={handleOnChange}
                                name='name'
                            />
                        </div>

                        {/* Logo Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Type</Label>
                            <Input
                                id="type"
                                placeholder="Enter type"
                                value={inputForm.type}
                                onChange={handleOnChange}
                                name='type'
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
                            Update Expense-Categories
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateExpensecategories;