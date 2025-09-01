import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const brandAPI=createApi({
    reducerPath:'brandAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/brand`,
        credentials:'include'
    }),
    tagTypes:['brand'],
    endpoints:(builder)=>({
        createBrand:builder.mutation({
            query:(data)=>({
                url:"/creat-brand",
                method:"POST",
                body:data
            })
        }),
        getBrand:builder.query({
            query:()=>({
                url:"/get-brand",
                method:"GET",
            })
        }),
        getsingleBrand:builder.query({
            query:(id)=>({
                url:`/single-brand/${id}`,
                method:"GET",
            })
        }),
        updateBrand:builder.mutation({
            query:({id,data})=>({
                url:`/update-brand/${id}`,
                method:"POST",
                body:data
            })
        }),
        deleteBrand:builder.mutation({
            query:(id)=>({
                url:`/delete-brand/${id}`,
                method:"DELETE",
            })
        }),
        searchBrand:builder.query({
            query:(keyword)=>({
                url:`/search-brand?keyword=${encodeURIComponent(keyword)}`,
                method:"GET"
            })
        }),
        pagination:builder.query({
            query:(page=1)=>({
                url:`/get-paginate?page=${page}`,
                method:"GET",
            })
        })
    })
})




export const {useCreateBrandMutation,useGetBrandQuery,useGetsingleBrandQuery,useUpdateBrandMutation,useDeleteBrandMutation,useSearchBrandQuery,usePaginationQuery}=brandAPI
export default brandAPI;