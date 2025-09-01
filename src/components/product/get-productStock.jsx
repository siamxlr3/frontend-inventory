import React from 'react';
import { useParams} from "react-router-dom";
import {useStockByProductQuery} from "@/redux/feature/stockAPI/stockAPI.js";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";

const GetProductStock = () => {
    const {id}=useParams()
    const {data}=useStockByProductQuery(id)

    const productData=data?.data || []

    return (
        <div className="p-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Buy_Price</TableHead>
                        <TableHead>Sell_Price</TableHead>
                        <TableHead>Total_Amount</TableHead>
                        <TableHead>Paid_Amount</TableHead>
                        <TableHead>Due_Amount</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {productData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{item.Product?.name}</TableCell>
                            <TableCell className="font-medium">{item.quantity}</TableCell>
                            <TableCell className="font-medium">{item.buy_price}</TableCell>
                            <TableCell className="font-medium">{item.sell_price}</TableCell>
                            <TableCell className="font-medium">{item.total_amount}</TableCell>
                            <TableCell className="font-medium">{item.paid_amount}</TableCell>
                            <TableCell className="font-medium">{item.due_amount}</TableCell>
                            <TableCell>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "paid"
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
        </div>
    );
};

export default GetProductStock;