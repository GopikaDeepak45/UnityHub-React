import { apiSlice } from "../apiSlice";

const USER_URL = "/user";

// Inject additional endpoints into the existing adminApiSlice
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder: {
    query: (arg0: {
      query:
        | ((id: any) => { url: string; method: string; params: { id: any } })
        | ((userId: any) => {
            url: string;
            method: string;
            params: { userId: any };
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
    registerUser: builder.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: { ...data },
      }),
    }),
    verifyOTPUser: builder.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/otp`,
        method: "POST",
        body: { ...data },
      }),
    }),
    basicUserData: builder.query({
      query: (userId: any) => ({
        url: `${USER_URL}/basicInfo`,
        method: "GET",
        params: { userId },
      }),
    }),
    userInfo: builder.query({
      query: (userId: any) => ({
        url: `${USER_URL}/userInfo`,
        method: "GET",
        params: { userId },
      }),
    }),
    updateUser: builder.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/update-profile`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    changeUserPassword: builder.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/change-password`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    getGroupsDataUser: builder.query({
      query: (userId: any) => ({
        url: `${USER_URL}/groups`,
        method: "GET",
        params: { userId },
      }),
    }),
    addPost: builder.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/posts/add`,
        method: "POST",
        body: { ...data },
      }),
    }),
    getBuildingServicesDataUser: builder.query({
      query: (userId: any) => ({
        url: `${USER_URL}/building-services`,
        method: "GET",
        params: { userId },
      }),
    }),
    getBuildingServiceFreeSlots: builder.query({
      query: (data: any) => ({
        url: `${USER_URL}/building-service/free-slots`,
        method: "GET",
        params: { ...data },
      }),
    }),
    addBuildingServiceSchedule: builder.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/building-service/schedule`,
        method: "POST",
        params: { ...data },
      }),
    }),
    getUsersDataByUser: builder.query({
      query: (data:any) => ({
        url: `${USER_URL}/users`,
        method: "GET",
        params: { ...data },
      }),
    }),
    
  }),
  
  
});

export const {
  useRegisterUserMutation,
  useVerifyOTPUserMutation,
  useBasicUserDataQuery,
  useUserInfoQuery,
  useUpdateUserMutation,
  useChangeUserPasswordMutation,
  useGetGroupsDataUserQuery,
  useAddPostMutation,
  useGetBuildingServicesDataUserQuery,
  useGetBuildingServiceFreeSlotsQuery,
  useAddBuildingServiceScheduleMutation,
  useGetUsersDataByUserQuery,
} = userApi;
