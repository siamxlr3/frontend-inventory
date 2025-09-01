import React from 'react';
import { useParams} from "react-router-dom";
import {useTransactionByPaymentQuery} from "@/redux/feature/transactionAPI/transactionAPI.js";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";

const PaymentTransactionList = () => {
    const {id}=useParams();
    const {data}=useTransactionByPaymentQuery(id)

    const paymentData=data?.data || []
 
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
                {paymentData.map((item, index) => (
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

export default PaymentTransactionList;