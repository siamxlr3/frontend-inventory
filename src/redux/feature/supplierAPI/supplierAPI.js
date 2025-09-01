import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const supplierAPI = createApi({
    reducerPath:'supplierAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/supplier`,
        credentials:'include'
    }),
    tagTypes:['supplier'],
    endpoints:(builder)=>({
        createsupplier:builder.mutation({
            query:(data)=>({
                url:"/create",
                method:"POST",
                body:data
            })
        }),
        getSupplier:builder.query({
            query:()=>({
                url:"/get-supplier",
                method:"GET",
            })
        }),
        updateSupplier:builder.mutation({
            query:({id,data})=>({
                url:`/update-supplier/${id}`,
                method:"POST",
                body:data
            })
        }),
        deleteSupplier:builder.mutation({
            query:(id)=>({
                url:`/delete-supplier/${id}`,
                method:"DELETE",
            })
        }),
        searchSupplier:builder.query({
            query:(keyword)=>({
                url:`/search-supplier?keyword=${encodeURIComponent(keyword)}`,
                method:"GET"
            })
        }),
        supplierPagination:builder.query({
            query:(page=1)=>({
                url:`/paginate?page=${page}`,
                method:"GET",
            })
        })
    })
})


export const {useCreatesupplierMutation,useGetSupplierQuery,useUpdateSupplierMutation,useDeleteSupplierMutation,useSearchSupplierQuery,useSupplierPaginationQuery}=supplierAPI
export default supplierAPI