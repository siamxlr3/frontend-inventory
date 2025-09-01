import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const retailcustomerAPI = createApi({
    reducerPath:'retailcustomerAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/retail-customer`,
        credentials:'include'
    }),
    tagTypes:['retail-customer'],
    endpoints:(builder)=>({
        create:builder.mutation({
            query:(data)=>({
                url:"/create",
                method:"POST",
                body:data
            })
        }),
        get:builder.query({
            query:()=>({
                url:"/get-customer",
                method:"GET",
            })
        }),
        update:builder.mutation({
            query:({id,data})=>({
                url:`/update-customer/${id}`,
                method:"POST",
                body:data
            })
        }),
        delete:builder.mutation({
            query:(id)=>({
                url:`/delete-customer/${id}`,
                method:"DELETE",
            })
        }),
        search:builder.query({
            query:(keyword)=>({
                url:`/search-customer?keyword=${encodeURIComponent(keyword)}`,
                method:"GET"
            })
        }),
        paginate:builder.query({
            query:(page=1)=>({
                url:`/paginate?page=${page}`,
                method:"GET",
            })
        })
    })
})



export const {useCreateMutation,useGetQuery,useUpdateMutation,useDeleteMutation,useSearchQuery,usePaginateQuery}=retailcustomerAPI
export default retailcustomerAPI