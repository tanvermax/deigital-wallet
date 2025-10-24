
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
        allBalance: builder.query({
            query: () => ({
                url: "/admin/wallets",
                method: "GET",
                withCredentials: true
            }),
            providesTags: ["ADMIN"],
            transformResponse: (arg) => arg.data,
        }),
    }),
})

export const { useTransactionInfoQuery, useAllUserInfoQuery,useAllBalanceQuery } = adminApi