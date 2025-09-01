import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const warehouseAPI=createApi({
    reducerPath:'warehouseAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/warehouse`,
        credentials:'include'
    }),
    tagTypes:['warehouse'],
    endpoints:(builder)=>({
        createWarehouse:builder.mutation({
            query:(data)=>({
                url:"/create-house",
                method:"POST",
                body:data
            })
       }),
        getWarehouse:builder.query({
            query:()=>({
                url:"/get-house",
                method:"GET",
            })
        }),
        updateWarehouse:builder.mutation({
            query:({id,data})=>({
                url:`/update-house/${id}`,
                method:"POST",
                body:data
            })
        }),
        deleteWarehouse:builder.mutation({
            query:(id)=>({
                url:`/delete-house/${id}`,
                method:"DELETE",
            })
        }),
        searchHouse:builder.query({
            query:(keyword)=>({
                url:`/search-house?keyword=${encodeURIComponent(keyword)}`,
                method:"GET"
            })
        }),
        paginationHouse:builder.query({
            query:(page=1)=>({
                url:`/get-paginate?page=${page}`,
                method:"GET",
            })
        })
    })
})



export const {useCreateWarehouseMutation,useGetWarehouseQuery,useUpdateWarehouseMutation,useDeleteWarehouseMutation,useSearchHouseQuery,usePaginationHouseQuery}=warehouseAPI
export default warehouseAPI