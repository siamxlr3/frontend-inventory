import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";
import {setToken} from "@/utilitis/sessionHelper.js";

const authAPI=createApi({
    reducerPath:'authAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/user`,
        credentials:'include'
    }),
    tagTypes:['user'],
    endpoints:(builder)=>({
        createUser:builder.mutation({
            query:(data)=>({
                url:"/register",
                method:"POST",
                body:data
            })
        }),
        loginUser:builder.mutation({
            query:(data)=>({
                url:"/login",
                method:"POST",
                body:data
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    setToken(data.token);
                    alert("Login successful");
                } catch (err) {
                    alert("Login failed");
                }
            }
        }),
        logoutUser:builder.mutation({
            query:()=>({
                url:"/logout",
                method:"POST",
            })
        }),
        getUser:builder.query({
            query:()=>({
                url:"/get-user",
                method:"GET",
            })
        }),
        getProfile:builder.query({
            query:(id)=>({
                url:`/get-profile/${id}`,
                method:"GET",
            })
        }),
        updateUser:builder.mutation({
            query:({id,data})=>({
                url:`/update-user/${id}`,
                method:"POST",
                body:data
            })
        }),
        deleteUser:builder.mutation({
            query:(id)=>({
                url:`/delete-user/${id}`,
                method:"DELETE",
            })
        }),
    })
})


export const {useCreateUserMutation,useLoginUserMutation,useLogoutUserMutation,useGetUserQuery,useGetProfileQuery,useUpdateUserMutation,useDeleteUserMutation}=authAPI
export default authAPI;