import { apiSlice } from "../apiSlice";

const COMM_ADMIN_URL = "/commAdmin";

// Inject additional endpoints into the existing adminApiSlice
export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder: {
    query: (arg0: {
      query:
        | ((id: any) => { url: string; method: string; params: { id: any } })
        | ((communityAdminId: any) => {
            url: string;
            method: string;
            params: { communityAdminId: any };
          });
    }) => any;
    mutation: (arg0: {
      query:
        | ((data: any) => { url: string; method: string; body: any })
        | ((data: any) => { url: string; method: string; body: any })
        | ((data: any) => { url: string; method: string; body: any })
        | ((data: any) => { url: string; method: string; body: any })
        | ((data: any) => { url: string; method: string; body: any })
        | ((data: any) => { url: string; method: string; body: any })
        | ((data: any) => { url: string; method: string; params: any })
        | ((data: any) => { url: string; method: string; body: any });
    }) => any;
  }) => ({
    getProfile: builder.query({
      query: (id: string) => ({
        url: `${COMM_ADMIN_URL}/profile`,
        method: "GET",
        params: { id },
      }),
    }),
    addCommunityBannerImage: builder.mutation({
      query: (data: any) => ({
        url: `${COMM_ADMIN_URL}/images/addImage`,
        method: "POST",
        body: { ...data },
      }),
    }),
    deleteCommunityImage: builder.mutation({
      query: (data: any) => ({
        url: `${COMM_ADMIN_URL}/images/deleteImage`,
        method: "DELETE",
        body: { ...data },
      }),
    }),
    // Define a mutation endpoint for adding a user
    register: builder.mutation({
      query: (data: any) => ({
        url: `${COMM_ADMIN_URL}/register`,
        method: "POST",
        body: { ...data },
      }),
    }),
    verifyOTPCommAdmin: builder.mutation({
      query: (data: any) => ({
        url: `${COMM_ADMIN_URL}/otp`,
        method: "POST",
        body: { ...data },
      }),
    }),
    getCommunityData: builder.query({
      query: (communityAdminId: any) => ({
        url: `${COMM_ADMIN_URL}/community`,
        method: "GET",
        params: { communityAdminId },
      }),
    }),
    getUsersData: builder.query({
      query: (communityAdminId: any) => ({
        url: `${COMM_ADMIN_URL}/users`,
        method: "GET",
        params: { communityAdminId },
      }),
    }),
    addMembers: builder.mutation({
      query: (data: any) => ({
        url: `${COMM_ADMIN_URL}/members/add`,
        method: "POST",
        body: { ...data },
      }),
    }),

    updateMember: builder.mutation({
      query: (data: any) => ({
        url: `${COMM_ADMIN_URL}/member/edit`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    deleteMember: builder.mutation({
      query: (data: any) => ({
        url: `${COMM_ADMIN_URL}/member/delete`,
        method: "DELETE",
        params: { ...data },
      }),
    }),
    blockUser: builder.mutation({
      query: (data: any) => ({
        url: `${COMM_ADMIN_URL}/user/block`,
        method: "POST",
        body:{...data}
      }),
    }),
    unblockUser: builder.mutation({
      query: (userId: any) => ({
        url: `${COMM_ADMIN_URL}/user/unblock`,
        method: 'POST',
        params: { userId },
      }),
    }),
    getGroupsData: builder.query({
      query: (communityAdminId: any) => ({
        url: `${COMM_ADMIN_URL}/groups`,
        method: "GET",
        params: { communityAdminId },
      }),
    }),

    addGroups: builder.mutation({
      query: (data: any) => ({
        url: `${COMM_ADMIN_URL}/groups/add-group`,
        method: "POST",
        body: { ...data },
      }),
    }),
    deleteGroup: builder.mutation({
      query: (data: any) => ({
        url: `${COMM_ADMIN_URL}/groups/delete`,
        method: "DELETE",
        params: { ...data },
      }),
    }),
    editGroup: builder.mutation({
      query: (data: any) => ({
        url: `${COMM_ADMIN_URL}/groups/edit`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    getBuildingServicesData: builder.query({
      query: (communityAdminId: any) => ({
        url: `${COMM_ADMIN_URL}/building-services`,
        method: "GET",
        params: { communityAdminId },
      }),
    }),
    addBuildingService: builder.mutation({
      query: (data: any) => ({
        url: `${COMM_ADMIN_URL}/building-services/addService`,
        method: "POST",
        body: { ...data },
      }),
    }),
    editBuildingService: builder.mutation({
      query: (data: any) => ({
        url: `${COMM_ADMIN_URL}/building-services/edit-service`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    
    deleteBuildingService: builder.mutation({
      query: (data: any) => ({
        url: `${COMM_ADMIN_URL}/building-services/delete`,
        method: "DELETE",
        params: { ...data },
      }),
    }),
  }),
});

// Extract generated hooks for each endpoint
export const {
  useRegisterMutation,
  useAddCommunityBannerImageMutation,
  useDeleteCommunityImageMutation,
  useVerifyOTPCommAdminMutation,
  useGetProfileQuery,
  useGetCommunityDataQuery,
  useGetUsersDataQuery,
  useAddMembersMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useGetGroupsDataQuery,
  useAddGroupsMutation,
  useDeleteGroupMutation,
  useEditGroupMutation,
  useGetBuildingServicesDataQuery,
  useAddBuildingServiceMutation,
  useEditBuildingServiceMutation,
  useDeleteBuildingServiceMutation
} = adminApi;
