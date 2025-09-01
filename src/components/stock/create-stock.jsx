import React, {useState} from 'react';
import {useCreateStockMutation} from "@/redux/feature/stockAPI/stockAPI.js";
import {useSelector} from "react-redux";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useGetProductQuery} from "@/redux/feature/productAPI/productAPI.js";
import {useGetSupplierQuery} from "@/redux/feature/supplierAPI/supplierAPI.js";
import {useGetWarehouseQuery} from "@/redux/feature/warehouseAPI/warehouseAPI.js";

const CreateStock = () => {

    const {user}=useSelector((state) => state.auth);
    const [createStock]=useCreateStockMutation()
    const {data:productData}=useGetProductQuery()
    const {data:supplierData}=useGetSupplierQuery()
    const {data:warehouseData}=useGetWarehouseQuery()

    const Productdata=productData?.data || []
    const Supplierdata=supplierData?.data || []
    const Warehousedata=warehouseData?.data || []

    const [inputForm, setinputForm]=useState({
        product_id:'',
        supplier_id:'',
        warehouse_id:'',
        user_id:'',
        quantity:'',
        buy_price:'',
        sell_price:'',
        total_amount:'',
        paid_amount:'',
        due_amount:'',
        status:''
    })

    const handleOnChange = (e) => {
        const { name, value} = e.target;
        setinputForm({
            ...inputForm,
            [name]:value
        })
    };



    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const data={
                product_id:inputForm.product_id,
                supplier_id:inputForm.supplier_id,
                warehouse_id:inputForm.warehouse_id,
                user_id:user?.id,
                quantity:inputForm.quantity,
                buy_price:inputForm.buy_price,
                sell_price:inputForm.sell_price,
                total_amount:inputForm.total_amount,
                paid_amount:inputForm.paid_amount,
                due_amount:inputForm.due_amount,
                status:inputForm.status,
            }
            await createStock(data).unwrap()
            alert("stock created successfully.");
            setinputForm({
                product_id:'',
                supplier_id:'',
                warehouse_id:'',
                user_id:'',
                quantity:'',
                buy_price:'',
                sell_price:'',
                total_amount:'',
                paid_amount:'',
                due_amount:'',
                status:'',
            })
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div className="flex justify-center items-center  bg-gray-100 p-6">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-center">
                        Create New Stock
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="status">Product</Label>
                            <Select
                                value={inputForm.product_id}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "product_id", value}})
                                }
                                name="product_id"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select product"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Productdata.map(product => (
                                        <SelectItem key={product.id} value={product.id.toString()}>
                                            {product.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Supplier</Label>
                            <Select
                                value={inputForm.supplier_id}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "supplier_id", value}})
                                }
                                name="supplier_id"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select supplier"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Supplierdata.map(supplier => (
                                        <SelectItem key={supplier.id} value={supplier.id.toString()}>
                                            {supplier.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="status">WareHouse</Label>
                            <Select
                                value={inputForm.warehouse_id}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "warehouse_id", value}})
                                }
                                name="warehouse_id"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select warehouse"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Warehousedata.map(Warehouse => (
                                        <SelectItem key={Warehouse.id} value={Warehouse.id.toString()}>
                                            {Warehouse.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="name">Quantity</Label>
                            <Input
                                id="quantity"
                                placeholder="Enter quantity"
                                value={inputForm.quantity}
                                onChange={handleOnChange}
                                name='quantity'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Buy_Price</Label>
                            <Input
                                id="buy_price"
                                placeholder="Enter buy_price"
                                value={inputForm.buy_price}
                                onChange={handleOnChange}
                                name='buy_price'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Sell_Price</Label>
                            <Input
                                id="sell_price"
                                placeholder="Enter sell_price"
                                value={inputForm.sell_price}
                                onChange={handleOnChange}
                                name='sell_price'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Total_Amount</Label>
                            <Input
                                id="total_amount"
                                placeholder="Enter total_amount"
                                value={inputForm.total_amount}
                                onChange={handleOnChange}
                                name='total_amount'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Paid_Amount</Label>
                            <Input
                                id="paid_amount"
                                placeholder="Enter paid_amount"
                                value={inputForm.paid_amount}
                                onChange={handleOnChange}
                                name='paid_amount'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Due_Amount</Label>
                            <Input
                                id="due_amount"
                                placeholder="Enter due_amount"
                                value={inputForm.due_amount}
                                onChange={handleOnChange}
                                name='due_amount'
                            />
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={inputForm.status}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "status", value}})
                                }
                                name="status"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="unpaid">Unpaid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Submit Button */}
                        <Button onClick={handleSubmit} type="button" className="w-full mt-4">
                            Create Stock
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateStock;