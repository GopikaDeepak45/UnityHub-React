import { apiSlice } from "../apiSlice";

// Inject additional endpoints into the existing adminApiSlice
export const landingPageApi = apiSlice.injectEndpoints({
  endpoints: (builder: {
    query: (arg0: { query: () => { url: string; method: string } }) => any;
    mutation: (arg0: {
      query: (data: any) => { url: string; method: string; body: any };
    }) => any;
  }) => ({
    getLandingPage: builder.query({
      query: () => ({
        url: `/landing-page`,
        method: "GET",
      }),
    }),
    
    sendMessage: builder.mutation({
      query: (data: any) => ({
        url: `/contact`,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

// Extract generated hooks for each endpoint
export const { useGetLandingPageQuery, useSendMessageMutation } =
  landingPageApi;
