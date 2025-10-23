
import { baseApi } from "@/redux/baseApi";


export const authApi = baseApi.injectEndpoints({
 endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: "user/register",
                method: "POST",
                data: userInfo
            }),
            
        }),
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
                withCredentials: true,
            }),
            
        })
        ,
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags:["USER"]
        }),
        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
                withCredentials: true
            }),
            providesTags:["USER"]
        })
    })
})

export const {useUserInfoQuery, useLogoutMutation,useRegisterMutation,useLoginMutation } = authApi