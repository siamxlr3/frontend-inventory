import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const investmentAPI=createApi({
    reducerPath:'investmentAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/investment`,
        credentials:'include'
    }),
    tagTypes:['investment'],
    endpoints:(builder)=>({
        createInvestment:builder.mutation({
            query:(data)=>({
                url:"/create",
                method:"POST",
                body:data
            })
        }),
        getInvestment:builder.query({
            query:()=>({
                url:"/get-all",
                method:"GET",
            })
        }),
        updateInvestment:builder.mutation({
            query:({id,data})=>({
                url:`/update/${id}`,
                method:"POST",
                body:data
            })
        }),
        deleteInvestment:builder.mutation({
            query:(id)=>({
                url:`/delete/${id}`,
                method:"DELETE",
            })
        }),
        searchInvestment:builder.query({
            query:(keyword)=>({
                url:`/search?keyword=${encodeURIComponent(keyword)}`,
                method:"GET"
            })
        }),
        paginationInvestment:builder.query({
            query:(page=1)=>({
                url:`/paginate?page=${page}`,
                method:"GET",
            })
        }),
        investmentByPayment:builder.query({
            query:(id)=>({
                url:`/investment-by-payment/${id}`,
                method:"GET",
            })
        }),
    })
})


export const {useCreateInvestmentMutation,
    useGetInvestmentQuery,
    useUpdateInvestmentMutation,
    useDeleteInvestmentMutation,
    useSearchInvestmentQuery,
    usePaginationInvestmentQuery,
    useInvestmentByPaymentQuery,}=investmentAPI
export default investmentAPI