import { baseApi } from "@/redux/baseApi"



export const usertransactionapi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // agentTransaction: builder.query({
        //     query: () => ({
        //         url: "/agent/history",
        //         method: "GET",
        //         withCredentials: true
        //     }),
        //     providesTags: ["TRANSACTION"],
        //     transformResponse: (arg) => arg.data,
        // }),
        userTransaction: builder.query({
            query: () => ({
                url: "/user/history",
                method: "GET",
                withCredentials: true
            }),
            providesTags: ["TRANSACTION"],
            transformResponse: (arg) => arg.data,
        })
    })
})

export const { useUserTransactionQuery } = usertransactionapi