/*import { apiSlice } from "../apiSlice";

const USER_URL = "/user";
export const connectionApi=apiSlice.injectEndpoints({
    endpoints:(builder:any)=>({

    })
})

export const{ }=connectionApi*/

import { apiSlice } from "../apiSlice";

const USER_URL = "/user/connections";
export const connectionApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getUserConnections: builder.query({
        query: ({ userId }:any) => `${USER_URL}/${userId}`,
        method:'GET'
      }),
    sendConnectionRequest: builder.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/send-connection-request`,
        method: "POST",
        params: { ...data },
      }),
    }),
    acceptConnectionRequest: builder.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/accept-connection-request`,
        method: "POST",
        params: { ...data },
      }),
    }),
    declineConnectionRequest: builder.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/decline-connection-request`,
        method: "POST",
        params: { ...data },
      }),
    }),
  }),
});

export const {
    useGetUserConnectionsQuery,
  useSendConnectionRequestMutation,
  useAcceptConnectionRequestMutation,
  useDeclineConnectionRequestMutation,
} = connectionApi;
