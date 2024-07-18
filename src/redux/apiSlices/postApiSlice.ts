import { apiSlice } from "../apiSlice";

const POST_URL = "/user/posts";
export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    fetchPosts: builder.query({
      query: (data: any) => ({
        url: POST_URL,
        method: "GET",
        params: { ...data },
      }),
    }),
    deletePost: builder.mutation({
      query: (data: any) => ({
        url: `${POST_URL}/delete-post`,
        method: "DELETE",
        params: { ...data },
      }),
    }),
    fetchMyPosts: builder.query({
      query: (data: any) => ({
        url: `${POST_URL}/my-posts`,
        method: "GET",
        params: { ...data },
      }),
    }),
    fetchComments: builder.query({
      query: (data: any) => ({
        url: `${POST_URL}/comments`,
        method: "GET",
        params: { ...data },
      }),
    }),
    likePost: builder.mutation({
      query: (data: any) => ({
        url: `${POST_URL}/like`,
        method: "POST",
        params: { ...data },
      }),
    }),
    unlikePost: builder.mutation({
      query: (data: any) => ({
        url: `${POST_URL}/unlike`,
        method: "POST",
        params: { ...data },
      }),
    }),
    likeComment: builder.mutation({
      query: (data: any) => ({
        url: `${POST_URL}/comment/like`,
        method: "POST",
        params: { ...data },
      }),
    }),
    unlikeComment: builder.mutation({
      query: (data: any) => ({
        url: `${POST_URL}/comment/unlike`,
        method: "POST",
        params: { ...data },
      }),
    }),
    addComment: builder.mutation({
      query: (data: any) => ({
        url: `${POST_URL}/comment`,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useFetchPostsQuery,
  useDeletePostMutation,
  useFetchMyPostsQuery,
  useFetchCommentsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
  useAddCommentMutation,
} = postApi;
