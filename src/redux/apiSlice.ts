import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    
  } from '@reduxjs/toolkit/query'
import { RootState } from '@/store/reducers'
import { setCredentials } from './slices/authSlice'

interface RefreshData {
    accessToken: string;
    // Add other properties if needed
}

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {

        const token = (getState() as RootState).auth.token

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log(extraOptions) //custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions)

       if (result?.error?.status === 403) {
        console.log('sending refresh token')

        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        console.log('refresh result ',refreshResult)

        if (refreshResult?.data) {
            const refreshResultData = refreshResult.data as RefreshData
            const accessToken = refreshResultData.accessToken
            // store the new token 
            api.dispatch(setCredentials({accessToken }));

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.error?.status === 403) {
                // If data is unknown, handle it appropriately
                const errorMessage = typeof refreshResult.error.data === 'string' ? refreshResult.error.data : "Your login has expired."
                return { error: { status: 403, data: errorMessage } };
            }
            
            return refreshResult
        }
    }

    return result
}

export const apiSlice:any = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: _builder => ({})
})