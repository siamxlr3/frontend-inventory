import React, {useState} from 'react';
import {confirmDelete, showError, showSuccess} from "@/utilitis/sweetalertHelper.js";
import {useDeleteSellItemMutation, usePaginationSellItemQuery} from "@/redux/feature/sellitemAPI/sellitemAPI.js";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Edit, Trash2} from "lucide-react";

const SellItemList = () => {
    const [page, setPage] = useState(1);
    const { data: paginatedData, refetch } = usePaginationSellItemQuery(page);
    const [deleteSellItem] = useDeleteSellItemMutation();

    const sellitemData = paginatedData?.data || []

    const totalPages = paginatedData?.totalPages || 1;


    const HandleonDelete=async(id)=>{
        const result=await confirmDelete()
        if(result.isConfirmed){
            try {
                await deleteSellItem(id).unwrap()
                await showSuccess("Successfully deleted sell-item")
                refetch()
            }catch(e){
                showError("Something went wrong.")
            }
        }
    }
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <Link to='/create-sell-item'>
                    <Button className="bg-blue-500 text-white">Create Sell-Item</Button>
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Selling_Price</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Profit</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {sellitemData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{item.quantity}</TableCell>
                            <TableCell className="font-medium">{item.selling_price}</TableCell>
                            <TableCell className="font-medium">{item.total}</TableCell>
                            <TableCell className="font-medium">{item.profit}</TableCell>
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
                            <TableCell className="flex space-x-2">
                                <Link to={`/update-sell-item/${item.id}`}>
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

export default SellItemList;