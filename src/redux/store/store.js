import {configureStore} from "@reduxjs/toolkit";
import brandAPI from "@/redux/feature/brandAPI/brandAPI.js";
import categoryAPI from "@/redux/feature/categoryAPI/categoryAPI.js";
import warehouseAPI from "@/redux/feature/warehouseAPI/warehouseAPI.js";
import supplierAPI from "@/redux/feature/supplierAPI/supplierAPI.js";
import paymentAPI from "@/redux/feature/paymentAPI/paymentAPI.js";
import customerAPI from "@/redux/feature/customerAPI/customerAPI.js";
import authAPI from "@/redux/feature/authAPI/authAPI.js";
import authReducer from "../feature/authAPI/authSlice.jsx"
import productAPI from "@/redux/feature/productAPI/productAPI.js";
import stockAPI from "@/redux/feature/stockAPI/stockAPI.js";
import sellAPI from "@/redux/feature/sellAPI/sellAPI.js";
import retailcustomerAPI from "@/redux/feature/retailcustomerAPI/retailcustomerAPI.js";
import expensecategoriesAPI from "@/redux/feature/expensecategoriesAPI/expensecategoriesAPI.js";
import sellitemAPI from "@/redux/feature/sellitemAPI/sellitemAPI.js";
import investmentAPI from "@/redux/feature/investmentAPI/investmentAPI.js";
import expenseAPI from "@/redux/feature/expenseAPI/expenseAPI.js";
import transactionAPI from "@/redux/feature/transactionAPI/transactionAPI.js";


export const store=configureStore(({
    reducer: {
        [brandAPI.reducerPath]:brandAPI.reducer,
        [categoryAPI.reducerPath]:categoryAPI.reducer,
        [warehouseAPI.reducerPath]:warehouseAPI.reducer,
        [supplierAPI.reducerPath]:supplierAPI.reducer,
        [paymentAPI.reducerPath]:paymentAPI.reducer,
        [customerAPI.reducerPath]:customerAPI.reducer,
        [authAPI.reducerPath]:authAPI.reducer,
        auth:authReducer,
        [productAPI.reducerPath]:productAPI.reducer,
        [stockAPI.reducerPath]:stockAPI.reducer,
        [sellAPI.reducerPath]:sellAPI.reducer,
        [retailcustomerAPI.reducerPath]:retailcustomerAPI.reducer,
        [expensecategoriesAPI.reducerPath]:expensecategoriesAPI.reducer,
        [sellitemAPI.reducerPath]:sellitemAPI.reducer,
        [investmentAPI.reducerPath]:investmentAPI.reducer,
        [expenseAPI.reducerPath]:expenseAPI.reducer,
        [transactionAPI.reducerPath]:transactionAPI.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(transactionAPI.middleware,expenseAPI.middleware,investmentAPI.middleware,sellitemAPI.middleware,expensecategoriesAPI.middleware,retailcustomerAPI.middleware,sellAPI.middleware,brandAPI.middleware,categoryAPI.middleware,warehouseAPI.middleware,supplierAPI.middleware,paymentAPI.middleware,customerAPI.middleware,authAPI.middleware,productAPI.middleware,stockAPI.middleware),
}))