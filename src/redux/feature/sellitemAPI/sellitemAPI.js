import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const sellitemAPI=createApi({
    reducerPath: "sellitemAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/sell-item`,
        credentials:'include'
    }),
    tagTypes:['sell-item'],
    endpoints:(builder)=>({
        createSellItem:builder.mutation({
            query:(data)=>({
                url:"/create",
                method:"POST",
                body:data
            })
        }),
        getSellItem:builder.query({
            query:()=>({
                url:"/get-all",
                method:"GET",
            })
        }),
        updateSellItem:builder.mutation({
            query:({id,data})=>({
                url:`/update/${id}`,
                method:"POST",
                body:data
            })
        }),
        deleteSellItem:builder.mutation({
            query:(id)=>({
                url:`/delete/${id}`,
                method:"DELETE",
            })
        }),
        paginationSellItem:builder.query({
            query:(page=1)=>({
                url:`/paginate?page=${page}`,
                method:"GET",
            })
        }),
        sellItembySell:builder.query({
            query:(id)=>({
                url:`/sell_item-by-sell/${id}`,
                method:"GET",
            })
        }),
        sellItembyProduct:builder.query({
            query:(id)=>({
                url:`/sell_item-by-product/${id}`,
                method:"GET",
            })
        }),
        sellItemByStock:builder.query({
            query:(id)=>({
                url:`/sell_item-by-stock/${id}`,
                method:"GET",
            })
        }),
    })
})


export const {useCreateSellItemMutation,
    useGetSellItemQuery,
    useUpdateSellItemMutation,
    useDeleteSellItemMutation,
    usePaginationSellItemQuery,
    useSellItemBySellQuery,
    useSellItemByProductQuery,
    useSellItemByStockQuery}=sellitemAPI
export default sellitemAPI;