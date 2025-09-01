import {createBrowserRouter} from "react-router-dom";
import App from "@/App.jsx";
import BrandPage from "@/page/brand_page.jsx";
import CategoryPage from "@/page/category_page.jsx";
import WarehousePage from "@/page/warehouse_page.jsx";
import SupplierPage from "@/page/supplier_page.jsx";
import CreateBrand from "@/components/brand/create-brand.jsx";
import UpdateBrand from "@/components/brand/update-brand.jsx";
import CreateCategory from "@/components/category/create-category.jsx";
import UpdateCategory from "@/components/category/update-category.jsx";
import CreateWarehouse from "@/components/warehouse/create-warehouse.jsx";
import UpdateWarehouse from "@/components/warehouse/update-warehouse.jsx";
import CreateSupplier from "@/components/supplier/create-supplier.jsx";
import UpdateSupplier from "@/components/supplier/update-supplier.jsx";
import PaymentPage from "@/page/payment-page.jsx";
import CreatePayment from "@/components/payment/create-payment.jsx";
import UpdatePayment from "@/components/payment/update-payment.jsx";
import CustomerPage from "@/page/customer_page.jsx";
import CreateCustomer from "@/components/customer/create-customer.jsx";
import UpdateCustomer from "@/components/customer/update-customer.jsx";
import LoginPage from "@/page/login-page.jsx";
import RegisterPage from "@/page/register-page.jsx";
import ProfilePage from "@/page/profile-page.jsx";
import UpdateProfile from "@/components/profile/update-profile.jsx";
import PrivateRoute from "@/routes/privateRoute.jsx";
import ProductPage from "@/page/product-page.jsx";
import CreateProduct from "@/components/product/create-product.jsx";
import UpdateProduct from "@/components/product/update-product.jsx";
import GetBrandproduct from "@/components/brand/get-Brandproduct.jsx";
import StockPage from "@/page/stock-page.jsx";
import CreateStock from "@/components/stock/create-stock.jsx";
import UpdateStock from "@/components/stock/update-stock.jsx";
import GetProductStock from "@/components/product/get-productStock.jsx";
import GetStockWarehouse from "@/components/warehouse/get-stockWarehouse.jsx";
import GetStockSupplier from "@/components/supplier/get-stockSupplier.jsx";
import SellPage from "@/page/sell-page.jsx";
import CreateSell from "@/components/sell/create-sell.jsx";
import RetailCustomerPage from "@/page/retailCustomer-page.jsx";
import Create from "@/components/retail-customer/create.jsx";
import Update from "@/components/retail-customer/update.jsx";
import ExpenseCategoriesPage from "@/page/expense-categories-page.jsx";
import CreateExpensecategories from "@/components/expense-categories/createExpensecategories.jsx";
import UpdateExpensecategories from "@/components/expense-categories/updateExpensecategories.jsx";
import SellItemPage from "@/page/sell-item-page.jsx";
import CreateSellItem from "@/components/sell-item/create-sell-item.jsx";
import UpdateSell from "@/components/sell/updateSell.jsx";
import InvestmentPage from "@/page/investment-page.jsx";
import CreateInvestment from "@/components/investment/create-investment.jsx";
import UpdateInvestment from "@/components/investment/update-investment.jsx";
import PaymentInvestmentList from "@/components/payment/paymentInvestmentList.jsx";
import ExpensePage from "@/page/expense-page.jsx";
import CreateExpense from "@/components/expense/createExpense.jsx";
import UpdateExpense from "@/components/expense/updateExpense.jsx";
import PaymentExpenseList from "@/components/payment/paymentExpenseList.jsx";
import ExpensebyExpenseCategoriesList from "@/components/expense-categories/expensebyExpenseCategoriesList.jsx";
import TransactionPage from "@/page/transaction-page.jsx";
import CreateTransaction from "@/components/transaction/createTransaction.jsx";
import UpdateTransaction from "@/components/transaction/updateTransaction.jsx";
import TransactionStockList from "@/components/stock/transactionStockList.jsx";
import PaymentTransactionList from "@/components/payment/paymentTransactionList.jsx";
import ExpenseTransactionList from "@/components/expense/expenseTransactionList.jsx";


const router=createBrowserRouter([
    {
        path: "/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<PrivateRoute><BrandPage/></PrivateRoute>,
            },
            {
              path:"/create-brand",
              element:<PrivateRoute><CreateBrand/></PrivateRoute>,
            },
            {
              path:"/get-product/:id",
              element:<PrivateRoute><GetBrandproduct/></PrivateRoute>
            },
            {
              path:"/update-brand/:id",
              element:<PrivateRoute><UpdateBrand/></PrivateRoute>
            },
            {
                path:"/category",
                element:<PrivateRoute><CategoryPage/></PrivateRoute>,
            },
            {
                path:"/create-category",
                element:<PrivateRoute><CreateCategory/></PrivateRoute>
            },
            {
                path:"/update-category/:id",
                element:<PrivateRoute><UpdateCategory/></PrivateRoute>
            },
            {
                path:'/product',
                element:<PrivateRoute><ProductPage/></PrivateRoute>
            },
            {
              path:"/create-product",
              element:<PrivateRoute><CreateProduct/></PrivateRoute>
            },
            {
              path:'/update-product/:id',
              element:<PrivateRoute><UpdateProduct/></PrivateRoute>
            },
            {
                path:"/warehouse",
                element:<PrivateRoute><WarehousePage/></PrivateRoute>,
            },
            {
              path:"/create-house",
              element:<PrivateRoute><CreateWarehouse/></PrivateRoute>,
            },
            {
              path:"/update-house/:id",
              element:<PrivateRoute><UpdateWarehouse/></PrivateRoute>,
            },
            {
                path:"/supplier",
                element:<PrivateRoute><SupplierPage/></PrivateRoute>,
            },
            {
                path:"/create-supplier",
                element:<PrivateRoute><CreateSupplier/></PrivateRoute>,
            },
            {
                path:"/update-supplier/:id",
                element:<PrivateRoute><UpdateSupplier/></PrivateRoute>,
            },
            {
                path:"/payment",
                element:<PrivateRoute><PaymentPage/></PrivateRoute>,
            },
            {
                path:"/create-payment",
                element:<PrivateRoute><CreatePayment/></PrivateRoute>,
            },
            {
                path:"/update-payment/:id",
                element:<PrivateRoute><UpdatePayment/></PrivateRoute>,
            },
            {
                path:'/customer',
                element:<PrivateRoute><CustomerPage/></PrivateRoute>,
            },
            {
                path:"/create-customer",
                element:<PrivateRoute><CreateCustomer/></PrivateRoute>,
            },
            {
                path:"/update-customer/:id",
                element:<PrivateRoute><UpdateCustomer/></PrivateRoute>,
            },
            {
                path:"/stock",
                element:<PrivateRoute><StockPage/></PrivateRoute>,
            },
            {
                path:"/create-stock",
                element:<PrivateRoute><CreateStock/></PrivateRoute>,
            },
            {
                path:"/update-stock/:id",
                element:<PrivateRoute><UpdateStock/></PrivateRoute>,
            },
            {
                path:"/get-productstock/:id",
                element:<PrivateRoute><GetProductStock/></PrivateRoute>,
            },
            {
                path:"/get-stock-warehouse/:id",
                element:<PrivateRoute><GetStockWarehouse/></PrivateRoute>,
            },
            {
                path:"/get-stock-supplier/:id",
                element:<PrivateRoute><GetStockSupplier/></PrivateRoute>,
            },
            {
                path:'/sell',
                element:<PrivateRoute><SellPage/></PrivateRoute>
            },
            {
                path:"/create-sell",
                element:<PrivateRoute><CreateSell/></PrivateRoute>,
            },
            {
                path:'/sell-item',
              element:<PrivateRoute><SellItemPage/></PrivateRoute>,
            },
            {
              path:'/update-sell/:id',
              element:<PrivateRoute><UpdateSell/></PrivateRoute>,
            },
            {
              path:'/create-sell-item',
              element:<PrivateRoute><CreateSellItem/></PrivateRoute>,
            },
            {
                path:"/retail-customer",
                element:<PrivateRoute><RetailCustomerPage/></PrivateRoute>
            },
            {
                path:'/create-retail-customer',
                element:<PrivateRoute><Create/></PrivateRoute>,
            },
            {
                path:"/update-retail-customer/:id",
                element:<PrivateRoute><Update/></PrivateRoute>
            },
            {
                path:'/expense-categories',
                element:<PrivateRoute><ExpenseCategoriesPage/></PrivateRoute>
            },
            {
                path:"/create-expense-categories",
                element:<PrivateRoute><CreateExpensecategories/></PrivateRoute>
            },
            {
                path:'/update-expense-categories/:id',
                element:<PrivateRoute><UpdateExpensecategories/></PrivateRoute>
            },
            {
                path:'/investment',
                element:<PrivateRoute><InvestmentPage/></PrivateRoute>
            },
            {
                path:'/create-investment',
                element:<PrivateRoute><CreateInvestment/></PrivateRoute>,
            },
            {
                path:'/update-investment/:id',
                element:<PrivateRoute><UpdateInvestment/></PrivateRoute>,
            },
            {
                path:'/get-investment-payment/:id',
                element:<PrivateRoute><PaymentInvestmentList/></PrivateRoute>,
            },
            {
                path:'/expense',
                element:<PrivateRoute><ExpensePage/></PrivateRoute>,
            },
            {
                path:'/create-expense',
                element:<PrivateRoute><CreateExpense/></PrivateRoute>
            },
            {
                path:'/update-expense/:id',
                element:<PrivateRoute><UpdateExpense/></PrivateRoute>,
            },
            {
                path:'/get-expense-payment/:id',
                element:<PrivateRoute><PaymentExpenseList/></PrivateRoute>,
            },
            {
                path:'/expense-by-expense-categories/:id',
                element:<PrivateRoute><ExpensebyExpenseCategoriesList/></PrivateRoute>,
            },
            {
                path:'/transaction',
                element:<PrivateRoute><TransactionPage/></PrivateRoute>,
            },
            {
                path:'/create-transaction',
                element:<PrivateRoute><CreateTransaction/></PrivateRoute>,
            },
            {
                path:'/update-transaction/:id',
                element:<PrivateRoute><UpdateTransaction/></PrivateRoute>,
            },
            {
                path:'/get-stock-transaction/:id',
                element:<PrivateRoute><TransactionStockList/></PrivateRoute>,
            },
            {
                path:'/get-payment-transaction/:id',
                element:<PrivateRoute><PaymentTransactionList/></PrivateRoute>,
            },
            {
                path:'/expense-transaction/:id',
                element:<PrivateRoute><ExpenseTransactionList/></PrivateRoute>,
            }
        ]
    },
    {
        path:"/login",
        element:<LoginPage/>,
    },
    {
        path:'/register',
        element:<RegisterPage/>,
    },
    {
        path:"/profile",
        element:<PrivateRoute><ProfilePage/></PrivateRoute>,
    },
    {
        path:"/update-profile",
        element:<PrivateRoute><UpdateProfile/></PrivateRoute>,
    }
])


export default router