
import { apiSlice } from "@/redux/apiSlice"
import { logOut, setCredentials } from "../slices/authSlice"


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder: { mutation: (arg0: { query: ((credentials: any) => { url: string; method: string; body: any }) | (() => { url: string; method: string }) | (() => { url: string; method: string }); onQueryStarted?: ((_arg: any, { dispatch, queryFulfilled }: { dispatch: any; queryFulfilled: any }) => Promise<void>) | ((_arg: any, { dispatch, queryFulfilled }: { dispatch: any; queryFulfilled: any }) => Promise<void>) }) => any }) => ({
        login: builder.mutation({
            query: (credentials: any) => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(_arg: any, { dispatch, queryFulfilled }: any) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(_arg: any, { dispatch, queryFulfilled }: any) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice 