
import { baseApi } from "@/redux/baseApi";


export const userApi = baseApi.injectEndpoints({
 endpoints: (builder) => ({
        sendmoney: builder.mutation({
            query: (sendmoneyinfo) => ({
                url: "user/sendmoney",
                method: "POST",
                data: sendmoneyinfo
            }),
            
        }),
        withdrawinfo: builder.mutation({
            query: (withdrawinfo) => ({
                url: "user/withdraw",
                method: "POST",
                data: withdrawinfo
            }),
            
        }),
        
        // userInfo: builder.query({
        //     query: () => ({
        //         url: "/user/me",
        //         method: "GET",
        //         withCredentials: true
        //     }),
        //     providesTags:["USER"]
        // })
    })
})

export const { useSendmoneyMutation,useWithdrawinfoMutation} = userApi