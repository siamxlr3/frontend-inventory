import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useExpenseByPaymentQuery} from "@/redux/feature/expenseAPI/expenseAPI.js";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Edit, Trash2} from "lucide-react";

const PaymentExpenseList = () => {
    const {id}=useParams();
    const {data}=useExpenseByPaymentQuery(id)

    const paymentData=data?.data || []

    return (
        <Table>
            <TableHeader>
                <TableRow>

                    <TableHead>Description</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {paymentData.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{item.description}</TableCell>
                        <TableCell className="font-medium">{item.cost}</TableCell>
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

export default PaymentExpenseList;