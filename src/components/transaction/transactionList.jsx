import React, {useState} from 'react';
import {confirmDelete, showError, showSuccess} from "@/utilitis/sweetalertHelper.js";
import {
    useDeleteTransactionMutation,
    usePaginationTransactionQuery
} from "@/redux/feature/transactionAPI/transactionAPI.js";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Edit, Trash2} from "lucide-react";

const TransactionList = () => {

    const [page, setPage] = useState(1);

    const { data: paginatedData, refetch } = usePaginationTransactionQuery(page);
    const [deleteTransaction] = useDeleteTransactionMutation();


    const transactionData = paginatedData?.data || []

    const totalPages = paginatedData?.totalPages || 1;


    const HandleonDelete=async(id)=>{
        const result=await confirmDelete()
        if(result.isConfirmed){
            try {
                await deleteTransaction(id).unwrap()
                await showSuccess("Successfully delete transaction")
                refetch()
            }catch(e){
                showError("Something went wrong.")
            }
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <Link to='/create-transaction'>
                    <Button className="bg-blue-500 text-white">Create Transaction</Button>
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Other</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {transactionData.map((item, index) => (
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
                            <TableCell className="flex space-x-2">
                                <Link to={`/update-transaction/${item.id}`}>
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

export default TransactionList;