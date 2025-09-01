import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const categoryAPI=createApi({
    reducerPath:'categoryAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/category`,
        credentials:'include'
    }),
    tagTypes:['Category'],
    endpoints:(builder)=>({
        creatCategory:builder.mutation({
            query:(data)=>({
                url:"/create-category",
                method:"POST",
                body:data
            }),
            invalidatesTags: ["Category"],
        }),
        getCategory:builder.query({
            query:()=>({
                url:"/get-category",
                method:"GET",
            })
        }),
        singleCategory:builder.query({
            query:(id)=>({
                url:`/single-category/${id}`,
                method:"GET",
            }),
            providesTags: ["Category"],
        }),
        updateCategory:builder.mutation({
            query:({id,data})=>({
                url:`/update-category/${id}`,
                method:"POST",
                body:data
            }),
            invalidatesTags: ["Category"],
        }),
        deleteCategory:builder.mutation({
            query:(id)=>({
                url:`/delete-category/${id}`,
                method:"DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
        searchCategory:builder.query({
            query:(keyword)=>({
                url:`/search-category?keyword=${encodeURIComponent(keyword)}`,
                method:"GET"
            }),
            providesTags: ["Category"],
        }),
        paginationCategory:builder.query({
            query:(page=1)=>({
                url:`/get-paginate?page=${page}`,
                method:"GET",
            }),
            providesTags: ["Category"],
        })
    })
})


export const {useCreatCategoryMutation,useGetCategoryQuery,useSingleCategoryQuery,useUpdateCategoryMutation,useDeleteCategoryMutation,useSearchCategoryQuery,usePaginationCategoryQuery}=categoryAPI;
export default categoryAPI;