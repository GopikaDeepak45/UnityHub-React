import { apiSlice } from "../apiSlice";

const GROUP_URL = "/user/group";

// Inject additional endpoints into the existing adminApiSlice
export const groupApi = apiSlice.injectEndpoints({
  endpoints: (builder:any) => ({
    isUserGroupMember: builder.query({
      query: (data: any) => ({
        url: `${GROUP_URL}/isUserMember`,
        method: "GET",
        params: { ...data },
      }),
    }),
    joinGroup:builder.mutation({
        query:(data:any)=>({
            url:`${GROUP_URL}/joinGroup`,
            method:'POST',
            params:{...data}
        })
    }),
    fetchGroupMembers:builder.query({
query:(data:any)=>({
  url:`${GROUP_URL}/members`,
  method:'GET',
  params:{...data}
})
    }),
    addPostGroups: builder.mutation({
      query: (data: any) => ({
        url: `${GROUP_URL}/posts/add`,
        method: "POST",
        body: { ...data },
      }),
    }),
    fetchPostsGroups: builder.query({
      query: (data: any) => ({
        url: `${GROUP_URL}/posts`,
        method: "GET",
        params: { ...data },
      }),
    }),
    fetchCommentsGroups: builder.query({
      query: (data: any) => ({
        url: `${GROUP_URL}/posts/comments`,
        method: "GET",
        params: { ...data },
      }),
    }),
    likePostGroups: builder.mutation({
      query: (data: any) => ({
        url: `${GROUP_URL}/posts/like`,
        method: "POST",
        params: { ...data },
      }),
    }),
    unlikePostGroups: builder.mutation({
      query: (data: any) => ({
        url: `${GROUP_URL}/posts/unlike`,
        method: "POST",
        params: { ...data },
      }),
    }),
    likeCommentGroups: builder.mutation({
      query: (data: any) => ({
        url: `${GROUP_URL}/posts/comment/like`,
        method: "POST",
        params: { ...data },
      }),
    }),
    unlikeCommentGroups: builder.mutation({
      query: (data: any) => ({
        url: `${GROUP_URL}/posts/comment/unlike`,
        method: "POST",
        params: { ...data },
      }),
    }),
    addCommentGroups: builder.mutation({
      query: (data: any) => ({
        url: `${GROUP_URL}/posts/comment`,
        method: "POST",
        body: { ...data },
      }),
    }),
    
    
  }),
  
  
});

export const {
 useIsUserGroupMemberQuery,
 useJoinGroupMutation,
 useFetchGroupMembersQuery,
 useAddPostGroupsMutation,
 useFetchPostsGroupsQuery,
 useFetchCommentsGroupsQuery,
  useLikePostGroupsMutation,
  useUnlikePostGroupsMutation,
  useLikeCommentGroupsMutation,
  useUnlikeCommentGroupsMutation,
  useAddCommentGroupsMutation,
} = groupApi;
