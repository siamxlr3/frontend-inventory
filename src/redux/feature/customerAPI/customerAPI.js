import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const customerAPI=createApi({
    reducerPath:"customerAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/customer`,
        credentials:'include'
    }),
    tagTypes:['customer'],
    endpoints:(builder)=>({
        createCustomer:builder.mutation({
            query:(data)=>({
                url:"/create",
                method:"POST",
                body:data
            })
        }),
        getCustomer:builder.query({
            query:()=>({
                url:"/get-customer",
                method:"GET",
            })
        }),
        updateCustomer:builder.mutation({
            query:({id,data})=>({
                url:`/update-customer/${id}`,
                method:"POST",
                body:data
            })
        }),
        deleteCustomer:builder.mutation({
            query:(id)=>({
                url:`/delete-customer/${id}`,
                method:"DELETE",
            })
        }),
        searchCustomer:builder.query({
            query:(keyword)=>({
                url:`/search-customer?keyword=${encodeURIComponent(keyword)}`,
                method:"GET"
            })
        }),
        paginationCustomer:builder.query({
            query:(page=1)=>({
                url:`/paginate?page=${page}`,
                method:"GET",
            })
        })
    })
})


export const {useCreateCustomerMutation,useGetCustomerQuery,useUpdateCustomerMutation,useDeleteCustomerMutation,useSearchCustomerQuery,usePaginationCustomerQuery}=customerAPI
export default customerAPI;