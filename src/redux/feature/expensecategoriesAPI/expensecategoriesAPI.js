import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const expensecategoriesAPI=createApi({
    reducerPath:'expensecategoriesAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/expense-categories`,
        credentials:'include'
    }),
    tagTypes:['expense-categories'],
    endpoints:(builder)=>({
        createExpenseCategories:builder.mutation({
            query:(data)=>({
                url:"/create",
                method:"POST",
                body:data
            })
        }),
        getExpenseCategories:builder.query({
            query:()=>({
                url:"/get",
                method:"GET",
            })
        }),
        updateExpenseCategories:builder.mutation({
            query:({id,data})=>({
                url:`/update/${id}`,
                method:"POST",
                body:data
            })
        }),
        deleteExpenseCategories:builder.mutation({
            query:(id)=>({
                url:`/delete/${id}`,
                method:"DELETE",
            })
        }),
        searchExpenseCategories:builder.query({
            query:(keyword)=>({
                url:`/search?keyword=${encodeURIComponent(keyword)}`,
                method:"GET"
            })
        }),
        paginationExpenseCategories:builder.query({
            query:(page=1)=>({
                url:`/paginate?page=${page}`,
                method:"GET",
            })
        })
    })
})


export const {useCreateExpenseCategoriesMutation,useGetExpenseCategoriesQuery,useUpdateExpenseCategoriesMutation,useDeleteExpenseCategoriesMutation,useSearchExpenseCategoriesQuery,usePaginationExpenseCategoriesQuery}=expensecategoriesAPI
export default expensecategoriesAPI