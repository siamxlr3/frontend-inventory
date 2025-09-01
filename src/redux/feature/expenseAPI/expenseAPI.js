import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";



const expenseAPI=createApi({
    reducerPath:'expenseAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/expense`,
        credentials:'include'
    }),
    tagTypes:['product'],
    endpoints:(builder)=>({
        createExpense:builder.mutation({
            query:(data)=>({
                url:"/create",
                method:"POST",
                body:data
            })
        }),
        getExpense:builder.query({
            query:()=>({
                url:"/get",
                method:"GET",
            })
        }),
        updateExpense:builder.mutation({
            query:({id,data})=>({
                url:`/update/${id}`,
                method:"POST",
                body:data
            })
        }),
        deleteExpense:builder.mutation({
            query:(id)=>({
                url:`/delete/${id}`,
                method:"DELETE",
            })
        }),
        paginationExpense:builder.query({
            query:(page=1)=>({
                url:`/paginate?page=${page}`,
                method:"GET",
            })
        }),
        expenseByPayment:builder.query({
            query:(id)=>({
                url:`/payment-type/${id}`,
                method:"GET",
            })
        }),
        expenseByExpenseCategories:builder.query({
            query:(id)=>({
                url:`/expense-category/${id}`,
                method:"GET",
            })
        }),
    })
})


export const { useCreateExpenseMutation,
    useGetExpenseQuery,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation,
    usePaginationExpenseQuery,
    useExpenseByPaymentQuery,
    useExpenseByExpenseCategoriesQuery}=expenseAPI
export default expenseAPI;