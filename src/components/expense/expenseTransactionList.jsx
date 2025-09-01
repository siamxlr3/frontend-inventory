import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useTransactionByExpenseQuery} from "@/redux/feature/transactionAPI/transactionAPI.js";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Edit, Trash2} from "lucide-react";

const ExpenseTransactionList = () => {
    const {id}=useParams();
    const {data}=useTransactionByExpenseQuery(id)
    const expenseData=data?.data || []

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Other</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {expenseData.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{item.type}</TableCell>
                        <TableCell className="font-medium">{item.others}</TableCell>
                        <TableCell className="font-medium">{item.comment}</TableCell>
                        <TableCell className="font-medium">{item.amount}</TableCell>
                        <TableCell>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                  {item.status}
                </span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ExpenseTransactionList;