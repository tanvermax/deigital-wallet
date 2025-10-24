import { baseApi } from "@/redux/baseApi"



export const wallletapi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        walletinfo: builder.query({
            query: () => ({
                url: "/wallet/me",
                method: "GET",
                withCredentials: true
            }),
            providesTags: ["WALLET"],
            transformResponse: (arg) => arg.data,
        })
    })
})

export const { useWalletinfoQuery } = wallletapi