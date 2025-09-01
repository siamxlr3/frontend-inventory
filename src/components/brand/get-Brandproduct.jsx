import React from 'react';
import {useParams} from "react-router-dom";
import {useProductByBrandQuery} from "@/redux/feature/productAPI/productAPI.js";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";

const GetBrandproduct = () => {
    const {id}=useParams()
    const {data}=useProductByBrandQuery(id)

    const productData=data?.data || []

    return (
        <div className="p-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {productData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-12 h-12 object-contain"
                                />
                            </TableCell>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="font-medium">{item.description}</TableCell>
                            <TableCell className="font-medium">{item.quantity}</TableCell>
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
        </div>
    );
};

export default GetBrandproduct;