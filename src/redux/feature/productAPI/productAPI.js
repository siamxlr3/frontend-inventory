import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const productAPI = createApi({
    reducerPath:'productAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/product`,
        credentials:'include'
    }),
    tagTypes:['product'],
    endpoints:(builder)=>({
        createProduct:builder.mutation({
            query:(data)=>({
                url:"/create",
                method:"POST",
                body:data
            })
        }),
        getProduct:builder.query({
            query:()=>({
                url:"/get-product",
                method:"GET",
            })
        }),
        updateProduct:builder.mutation({
            query:({id,data})=>({
                url:`/update-product/${id}`,
                method:"POST",
                body:data
            })
        }),
        deleteProduct:builder.mutation({
            query:(id)=>({
                url:`/delete-product/${id}`,
                method:"DELETE",
            })
        }),
        searchProduct:builder.query({
            query:(keyword)=>({
                url:`/search-product?keyword=${encodeURIComponent(keyword)}`,
                method:"GET"
            })
        }),
        paginationProduct:builder.query({
            query:(page=1)=>({
                url:`/paginate?page=${page}`,
                method:"GET",
            })
        }),
        productByBrand:builder.query({
            query:(id)=>({
                url:`/product-by-brand/${id}`,
                method:"GET",
            })
        }),
        productByCategory:builder.query({
            query:(id)=>({
                url:`/product-by-category/${id}`,
                method:"GET",
            })
        }),
    })
})



export const {useCreateProductMutation,useGetProductQuery,useUpdateProductMutation,useDeleteProductMutation,useSearchProductQuery,usePaginationProductQuery,useProductByBrandQuery,useProductByCategoryQuery}=productAPI
export default productAPI