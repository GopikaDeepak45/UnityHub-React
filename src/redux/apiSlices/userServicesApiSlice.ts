import { apiSlice } from "../apiSlice";

const USER_URL = "/user";
const COMM_ADMIN_URL = "/commAdmin";

export const userServiceApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    addNewUserService: builder.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/add-service`,
        method: "POST",
        body: { ...data },
      }),
    }),
    getAllUserServicesAdmin: builder.query({
        query: (communityAdminId: any) => `${COMM_ADMIN_URL}/user-services/${communityAdminId}`,
      }),
      getAllUserServiceCategories: builder.query({
        query: (communityAdminId: any) => `${COMM_ADMIN_URL}/user-services/categories/${communityAdminId}`,
      }),
    approveNewUserService: builder.mutation({
      query: (data: any) => ({
        url: `${COMM_ADMIN_URL}/user-service/approve`,
        method: "POST",
        body: { ...data },
      }),
    }),
    rejectNewUserService: builder.mutation({
        query: (data: any) => ({
          url: `${COMM_ADMIN_URL}/user-service/reject`,
          method: "POST",
          body: { ...data },
        }),
      }),
    getUserServices: builder.query({
      query: (userId: any) => `${USER_URL}/service/${userId}`,
    }),
    editUserService: builder.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/service/edit`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    fetchApprovedServices:builder.query({
      query:(userId:any)=>({
        url:`${USER_URL}/services/all/${userId}`,
        method:'GET'
      })
    }),
    deleteUserService:builder.mutation({
        query:(serviceId: any) => ({

        url:`${USER_URL}/service/delete/${serviceId}`,
        method:'DELETE'
        })
    })
  }),
});

export const {
  useAddNewUserServiceMutation,
  useGetAllUserServicesAdminQuery,
  useApproveNewUserServiceMutation,
  useRejectNewUserServiceMutation,
  useGetUserServicesQuery,
  useEditUserServiceMutation,
  useDeleteUserServiceMutation,
  useGetAllUserServiceCategoriesQuery,
  useFetchApprovedServicesQuery,

} = userServiceApi;
