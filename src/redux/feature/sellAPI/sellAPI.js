import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const sellAPI=createApi({
    reducerPath: "sellAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/sell`,
        credentials:'include'
    }),
    tagTypes:['sell'],
    endpoints:(builder)=>({
        createSell:builder.mutation({
            query:(data)=>({
                url:"/create",
                method:"POST",
                body:data
            })
        }),
        getSell:builder.query({
            query:()=>({
                url:"/get-sell",
                method:"GET",
            })
        }),
        updateSell:builder.mutation({
            query:({id,data})=>({
                url:`/update-sell/${id}`,
                method:"POST",
                body:data
            })
        }),
        deleteSell:builder.mutation({
            query:(id)=>({
                url:`/delete-sell/${id}`,
                method:"DELETE",
            })
        }),
        paginationSell:builder.query({
            query:(page=1)=>({
                url:`/paginate?page=${page}`,
                method:"GET",
            })
        })
    })
})


export const {useCreateSellMutation,useGetSellQuery,useUpdateSellMutation,useDeleteSellMutation,usePaginationSellQuery}=sellAPI
export default sellAPI;