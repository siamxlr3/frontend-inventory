import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const transactionAPI=createApi({
    reducerPath:'transactionAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/transaction`,
        credentials:'include'
    }),
    tagTypes:['transaction'],
    endpoints:(builder)=>({
        createTracnsaction:builder.mutation({
            query:(data)=>({
                url:"/",
                method:"POST",
                body:data
            })
        }),
        getTransaction:builder.query({
            query:()=>({
                url:"/",
                method:"GET",
            })
        }),
        updateTransaction:builder.mutation({
            query:({id,data})=>({
                url:`/${id}`,
                method:"POST",
                body:data
            })
        }),
        deleteTransaction:builder.mutation({
            query:(id)=>({
                url:`/${id}`,
                method:"DELETE",
            })
        }),
        paginationTransaction:builder.query({
            query:(page=1)=>({
                url:`/page/list?page=${page}`,
                method:"GET",
            })
        }),
        transactionByStock:builder.query({
            query:(id)=>({
                url:`/stock/${id}`,
                method:"GET",
            })
        }),
        transactionByExpense:builder.query({
            query:(id)=>({
                url:`/expense/${id}`,
                method:"GET",
            })
        }),
        transactionByPayment:builder.query({
            query:(id)=>({
                url:`/payment/${id}`,
                method:"GET",
            })
        }),
    })
})



export const {useCreateTracnsactionMutation,
    useGetTransactionQuery,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation,
    usePaginationTransactionQuery,
    useTransactionByStockQuery,
    useTransactionByExpenseQuery,
    useTransactionByPaymentQuery}=transactionAPI
export default transactionAPI