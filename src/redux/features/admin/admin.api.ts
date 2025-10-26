
import { baseApi } from "@/redux/baseApi";


export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        transactionInfo: builder.query({
            query: () => ({
                url: "/admin/transactions",
                method: "GET",
                withCredentials: true
            }),
            providesTags: ["ADMIN"],
            transformResponse: (arg) => arg.data,
        }),
        allUserInfo: builder.query({
            query: () => ({
                url: "/admin/alluser",
                method: "GET",
                withCredentials: true
            }),
            providesTags: ["ADMIN"],
            transformResponse: (arg) => arg.data,
        }),
        allagentInfo: builder.query({
            query: () => ({
                url: "/admin/allagent",
                method: "GET",
                withCredentials: true
            }),
            providesTags: ["ADMIN"],
            transformResponse: (arg) => arg.data,
        }),
        allBalance: builder.query({
            query: () => ({
                url: "/admin/wallets",
                method: "GET",
                withCredentials: true
            }),
            providesTags: ["ADMIN"],
            transformResponse: (arg) => arg.data,
        }),
        blockinfo: builder.mutation({
            query: ({ userId, status }) => ({
                url: `/admin/wallet/user/${userId}`,
                method: "PATCH",
                data: { status },
                withCredentials: true,
                invalidatesTags: ["ADMIN"],
            }),
            
        }),
         agentupdate: builder.mutation({
            query: ({ agentId, status }) => ({
                url: `/admin/wallet/agent/${agentId}`,
                method: "PATCH",
                data: { status },
                withCredentials: true,
                invalidatesTags: ["ADMIN"],
            }),
            
        })


    }),
})

export const { useTransactionInfoQuery,useAgentupdateMutation,useAllagentInfoQuery, useBlockinfoMutation, useAllUserInfoQuery, useAllBalanceQuery } = adminApi