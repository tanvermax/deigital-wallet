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
        }),
        admoney: builder.mutation({
            query: (admoneyinfo) => ({
                url: "agent/addmoney",
                method: "POST",
                data: admoneyinfo
            }),
            
        }),
    })
})

export const { useAgentTransactionQuery,useAdmoneyMutation } = agentTransactionapi