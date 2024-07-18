import { apiSlice } from "../apiSlice";

// Inject additional endpoints into the existing adminApiSlice
export const landingPageApi = apiSlice.injectEndpoints({
  endpoints: (builder: { query: (arg0: { query: (() => { url: string; method: string; }) | (({ searchQuery }: { searchQuery: string; }) => { url: string; method: string; params: { searchQuery: string; }; }); }) => any; mutation: (arg0: { query: (data: any) => { url: string; method: string; body: any; }; }) => any; }) => ({
    getLandingPage: builder.query({
      query: () => ({
        url: `/landing-page`,
        method: "GET",
      }),
    }),
    getLandingPageSearch: builder.query({
      query: ({ searchQuery }: { searchQuery: string }) => ({
        url: `/landing-page`,
        method: "GET",
        params: { searchQuery },
      }),
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `/contact`,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

// Extract generated hooks for each endpoint
export const { 
  useGetLandingPageQuery, 
  useGetLandingPageSearchQuery, 
  useSendMessageMutation 
} = landingPageApi;
