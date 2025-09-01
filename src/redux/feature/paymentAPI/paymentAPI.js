import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const paymentAPI = createApi({
    reducerPath:'paymentAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/payment`,
        credentials:'include'
    }),
    tagTypes:['payment'],
    endpoints:(builder)=>({
        createPayment:builder.mutation({
            query:(data)=>({
                url:"/create",
                method:"POST",
                body:data
            })
        }),
        getPayment:builder.query({
            query:()=>({
                url:"/get-payment",
                method:"GET",
            })
        }),
        updatePayment:builder.mutation({
            query:({id,data})=>({
                url:`/update-payment/${id}`,
                method:"POST",
                body:data
            })
        }),
        deletePayment:builder.mutation({
            query:(id)=>({
                url:`/delete-payment/${id}`,
                method:"DELETE",
            })
        }),
        searchPayment:builder.query({
            query:(keyword)=>({
                url:`/search-payment?keyword=${encodeURIComponent(keyword)}`,
                method:"GET"
            })
        }),
        paginationPayment:builder.query({
            query:(page=1)=>({
                url:`/paginate?page=${page}`,
                method:"GET",
            })
        })
    })
})


export const {useCreatePaymentMutation,useGetPaymentQuery,useUpdatePaymentMutation,useDeletePaymentMutation,useSearchPaymentQuery,usePaginationPaymentQuery}=paymentAPI
export default paymentAPI;