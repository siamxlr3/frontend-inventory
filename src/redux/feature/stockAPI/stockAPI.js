import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const stockAPI = createApi({
    reducerPath:'stockAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/stock`,
        credentials:'include'
    }),
    tagTypes:['stock'],
    endpoints:(builder)=>({
        createStock:builder.mutation({
            query:(data)=>({
                url:"/create",
                method:"POST",
                body:data
            })
        }),
        getStock:builder.query({
            query:()=>({
                url:"/get-stock",
                method:"GET",
            })
        }),
        updateStock:builder.mutation({
            query:({id,data})=>({
                url:`/update-stock/${id}`,
                method:"POST",
                body:data
            })
        }),
        deleteStock:builder.mutation({
            query:(id)=>({
                url:`/delete-stock/${id}`,
                method:"DELETE",
            })
        }),
        stockByProduct:builder.query({
            query:(id)=>({
                url:`/stock-by-product/${id}`,
                method:"GET",
            })
        }),
        stockBySupplier:builder.query({
            query:(id)=>({
                url:`/stock-by-supplier/${id}`,
                method:"GET",
            })
        }),
        stockByWarehouse:builder.query({
            query:(id)=>({
                url:`/stock-by-house/${id}`,
                method:"GET",
            })
        }),
        paginationStock:builder.query({
            query:(page=1)=>({
                url:`/paginate?page=${page}`,
                method:"GET",
            })
        }),
    })
})


export const {useCreateStockMutation,useGetStockQuery,useUpdateStockMutation,useDeleteStockMutation,useStockByProductQuery,useStockBySupplierQuery,useStockByWarehouseQuery,usePaginationStockQuery}=stockAPI
export default stockAPI