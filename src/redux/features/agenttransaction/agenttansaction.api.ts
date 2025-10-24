import { baseApi } from "@/redux/baseApi"



export const agentTransactionapi = baseApi.injectEndpoints({
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
        agentTransaction: builder.query({
            query: () => ({
                url: "/agent/history",
                method: "GET",
                withCredentials: true
            }),
            providesTags: ["AGENTTRANSACTION"],
            transformResponse: (arg) => arg.data,
        })
    })
})

export const { useAgentTransactionQuery } = agentTransactionapi