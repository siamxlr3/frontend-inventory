import React, {useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2,Eye } from "lucide-react";
import {
    useDeleteBrandMutation,
    usePaginationQuery,
    useSearchBrandQuery
} from "@/redux/feature/brandAPI/brandAPI.js";
import {confirmDelete, showError, showSuccess} from "@/utilitis/sweetalertHelper.js";
import {Link} from "react-router-dom";

const BrandListUI = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const { data: paginatedData, refetch } = usePaginationQuery(page);
    const { data: searchData } = useSearchBrandQuery(search);
    const [deleteBrand] = useDeleteBrandMutation();


    const brandsData = search
        ? (searchData?.data || [])
        : (paginatedData?.data || []);

    const totalPages = paginatedData?.totalPages || 1;


    const HandleonDelete=async(id)=>{
        const result=await confirmDelete()
        if(result.isConfirmed){
            try {
                await deleteBrand(id).unwrap()
                await showSuccess("Successfully deleted brand")
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
                    placeholder="Search brand..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Link to='/create-brand'>
                    <Button className="bg-blue-500 text-white">Create Brand</Button>
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {brandsData.map((brand, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="w-12 h-12 object-contain"
                                />
                            </TableCell>
                            <TableCell className="font-medium">{brand.name}</TableCell>
                            <TableCell>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                        brand.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                  {brand.status}
                </span>
                            </TableCell>
                            <TableCell className="flex space-x-2">
                                <Link to={`/get-product/${brand.id}`}>
                                    <Button variant="ghost" size="sm">
                                        <Eye className="w-4 h-4 text-green-500"/>
                                    </Button>
                                </Link>
                                <Link to={`/update-brand/${brand.id}`}>
                                    <Button variant="ghost" size="sm">
                                        <Edit className="w-4 h-4 text-green-500"/>
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="sm" onClick={() => HandleonDelete(brand?.id)}>
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

export default BrandListUI;
