import React, {useState} from 'react';
import {useCreateSellItemMutation} from "@/redux/feature/sellitemAPI/sellitemAPI.js";
import {useGetSellQuery} from "@/redux/feature/sellAPI/sellAPI.js";
import {useGetProductQuery} from "@/redux/feature/productAPI/productAPI.js";
import {useGetStockQuery} from "@/redux/feature/stockAPI/stockAPI.js";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";

const CreateSellItem = () => {
  const [createSellItem]=useCreateSellItemMutation()

    const {data:sellData}=useGetSellQuery()
    const {data:productData}=useGetProductQuery()
    const {data:stockData}=useGetStockQuery()

    const Selldata=sellData?.data || []
    const Productdata=productData?.data || []
    const Stockdata=stockData?.data || []


    const [inputForm, setinputForm]=useState({
        quantity:'',
        selling_price:'',
        total:'',
        profit:'',
        status:'',
        product_id:'',
        stock_id:'',
        sell_id:''
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
                quantity:inputForm.quantity,
                selling_price:inputForm.selling_price,
                due_amount:inputForm.due_amount,
                total:inputForm.total,
                profit:inputForm.profit,
                status:inputForm.status,
                product_id:inputForm.product_id,
                stock_id:inputForm.stock_id,
                sell_id:inputForm.sell_id,
            }
            await createSellItem(data).unwrap()
            alert("sell-item created successfully.");
            setinputForm({
                quantity:'',
                selling_price:'',
                total:'',
                profit:'',
                status:'',
                product_id:'',
                stock_id:'',
                sell_id:''
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
                        Create New Sell-Item
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">

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
                            <Label htmlFor="name">Selling-Price</Label>
                            <Input
                                id="selling_price"
                                placeholder="Enter selling_price"
                                value={inputForm.selling_price}
                                onChange={handleOnChange}
                                name='selling_price'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Total</Label>
                            <Input
                                id="total"
                                placeholder="Enter total"
                                value={inputForm.total}
                                onChange={handleOnChange}
                                name='total'
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Profit</Label>
                            <Input
                                id="profit"
                                placeholder="Enter profit"
                                value={inputForm.profit}
                                onChange={handleOnChange}
                                name='profit'
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

                        <div className="space-y-2">
                            <Label htmlFor="status">Sell</Label>
                            <Select
                                value={inputForm.sell_id}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "sell_id", value}})
                                }
                                name="sell_id"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Sell"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Selldata.map(sell => (
                                        <SelectItem key={sell.id} value={sell.id.toString()}>
                                            {sell?.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

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
                                    <SelectValue placeholder="Select Product"/>
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
                            <Label htmlFor="status">Stock</Label>
                            <Select
                                value={inputForm.stock_id}
                                onValueChange={(value) =>
                                    handleOnChange({target: {name: "stock_id", value}})
                                }
                                name="stock_id"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Stock"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {Stockdata.map(stock => (
                                        <SelectItem key={stock.id} value={stock.id.toString()}>
                                            {stock.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Submit Button */}
                        <Button onClick={handleSubmit} type="button" className="w-full mt-4">
                            Create Sell
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateSellItem;