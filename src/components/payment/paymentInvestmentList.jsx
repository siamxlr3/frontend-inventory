import React from 'react';
import {useInvestmentByPaymentQuery} from "@/redux/feature/investmentAPI/investmentAPI.js";
import {Link, useParams} from "react-router-dom";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Edit, Trash2} from "lucide-react";

const PaymentInvestmentList = () => {

    const {id}=useParams()
    const {data}=useInvestmentByPaymentQuery(id)
    const paymentData=data?.data || []
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>deed_image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {paymentData.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-contain"
                            />
                        </TableCell>
                        <TableCell>
                            <img
                                src={item.deed_image}
                                alt={item.name}
                                className="w-12 h-12 object-contain"
                            />
                        </TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="font-medium">{item.amount}</TableCell>
                        <TableCell className="font-medium">{item.description}</TableCell>
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

export default PaymentInvestmentList;