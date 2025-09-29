import React, {useState} from 'react';
import {useDeleteStockMutation, usePaginationStockQuery} from "@/redux/feature/stockAPI/stockAPI.js";
import {confirmDelete, showError, showSuccess} from "@/utilitis/sweetalertHelper.js";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Edit, Eye, Trash2} from "lucide-react";

const StockList = () => {
    const [page, setPage] = useState(1);

    const {data:paginateData,refetch}=usePaginationStockQuery(page)
    const [deleteStock]=useDeleteStockMutation()

    const stockData =paginateData?.data || []
  console.log(stockData)

    const totalPages = paginateData?.totalPages || 1;

    const HandleonDelete=async(id)=>{
        const result=await confirmDelete()
        if(result.isConfirmed){
            try {
                await deleteStock(id).unwrap()
                await showSuccess("Successfully deleted stock")
                refetch()
            }catch(e){
                showError("Something went wrong.")
            }
        }
    }
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <Link to='/create-stock'>
                    <Button className="bg-blue-500 text-white">Create Stock</Button>
                </Link>
            </div>

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
                        <TableHead>Transaction</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {stockData.map((item, index) => (
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
                            <TableCell>
                                <Link to={`/get-stock-transaction/${item.id}`}>
                                    <Button variant="ghost" size="sm">
                                        <Eye className="w-4 h-4 text-green-500"/>
                                    </Button>
                                </Link>
                            </TableCell>
                            <TableCell className="flex space-x-2">
                                <Link to={`/update-stock/${item.id}`}>
                                    <Button variant="ghost" size="sm">
                                        <Edit className="w-4 h-4 text-green-500"/>
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="sm" onClick={() => HandleonDelete(item?.id)}>
                                    <Trash2 className="w-4 h-4 text-red-500"/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            <div className="flex justify-center space-x-2 mt-4">
                <Button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    Previous
                </Button>
                <span className="px-4 py-2">
                    Page {page} of {totalPages}
                </span>
                <Button
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default StockList;