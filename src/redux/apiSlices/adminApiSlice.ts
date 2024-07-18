import { apiSlice } from "../apiSlice";

const ADMIN_URL = "/admin";

// Inject additional endpoints into the existing adminApiSlice
export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder: { mutation: (arg0: { query: ((data: any) => { url: string; method: string; body: any; }) | ((data: any) => { url: string; method: string; body: any; }) | ((communityId: any) => { url: string; method: string; params: { communityId: any; }; }) | ((data: any) => { url: string; method: string; body: any; }) | ((data: any) => { url: string; method: string; body: any; }) | ((data: any) => { url: string; method: string; body: any; }) | ((data: any) => { url: string; method: string; body: any; }) | ((data: any) => { url: string; method: string; body: any; }); }) => any; query: (arg0: { query: () => { url: string; method: string; }; }) => any; }) => ({
    messageToCommunityAdmin: builder.mutation({
      query: (data: any) => ({
        url: `${ADMIN_URL}/community/message`,
        method: "POST",
        body:{...data}
      }),
    }),
    blockCommunity: builder.mutation({
      query: (data: any) => ({
        url: `${ADMIN_URL}/community/block`,
        method: "POST",
        body:{...data}
      }),
    }),
    unblockCommunity: builder.mutation({
      query: (communityId: any) => ({
        url: `${ADMIN_URL}/community/unblock`,
        method: 'POST',
        params: { communityId },
      }),
    }),
     addImage: builder.mutation({
      query: (data: any) => ({
        url: `${ADMIN_URL}/images/addImage`,
        method: "POST",
        body:{...data}
      }),
    }),
    deleteImage: builder.mutation({
      query: (data: any) => ({
        url: `${ADMIN_URL}/images/deleteImage`,
        method: "POST",
        body:{...data}
      }),
    }),
    addCorePackage: builder.mutation({
      query: (data: any) => ({
        url: `${ADMIN_URL}/packages/addPackage`,
        method: "POST",
        body:{...data}
      }),
    }),
    editCorePackage: builder.mutation({
      query: (data: any) => ({
        url: `${ADMIN_URL}/packages/editPackage`,
        method: "POST",
        body:{...data}
      }),
    }),
    deleteCorePackage: builder.mutation({
      query: (data: any) => ({
        url: `${ADMIN_URL}/packages/deletePackage`,
        method: "POST",
        body:{...data}
      }),
    }),
    fetchCommunityData: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/community`,
        method: "GET",
      }),
    }),
  }),
});

// Extract generated hooks for each endpoint
export const {useBlockCommunityMutation,useUnblockCommunityMutation,useMessageToCommunityAdminMutation,useAddImageMutation,useFetchCommunityDataQuery,useDeleteImageMutation,useAddCorePackageMutation,useEditCorePackageMutation,useDeleteCorePackageMutation} = adminApi;
