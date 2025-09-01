import React, {useState} from 'react';
import {confirmDelete, showError, showSuccess} from "@/utilitis/sweetalertHelper.js";
import {
    useDeleteExpenseCategoriesMutation,
    usePaginationExpenseCategoriesQuery,
    useSearchExpenseCategoriesQuery
} from "@/redux/feature/expensecategoriesAPI/expensecategoriesAPI.js";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Edit, Eye, Trash2} from "lucide-react";

const ExpenseCategoriesList = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const {data:paginateData,refetch}=usePaginationExpenseCategoriesQuery(page)
    const {data:searchData}=useSearchExpenseCategoriesQuery(search)
    const [deleteExpenseCategories]=useDeleteExpenseCategoriesMutation()

    const expenseData = search
        ? (searchData?.data || [])
        : (paginateData?.data || []);


    const totalPages = paginateData?.totalPages || 1;

    const HandleonDelete=async(id)=>{
        const result=await confirmDelete()
        if(result.isConfirmed){
            try {
                await deleteExpenseCategories(id).unwrap()
                await showSuccess("Successfully deleted expense-categories")
                refetch()
            }catch(e){
                showError("Something went wrong.")
            }
        }
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search expense..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Link to='/create-expense-categories'>
                    <Button className="bg-blue-500 text-white">Create Expense-Categories</Button>
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>

                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Expense</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {expenseData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="font-medium">{item.type}</TableCell>
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
                            <TableCell>
                                <Link to={`/expense-by-expense-categories/${item.id}`}>
                                    <Button variant="ghost" size="sm">
                                        <Eye className="w-4 h-4 text-green-500"/>
                                    </Button>
                                </Link>
                            </TableCell>
                            <TableCell className="flex space-x-2">
                                <Link to={`/update-expense-categories/${item.id}`}>
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

export default ExpenseCategoriesList;