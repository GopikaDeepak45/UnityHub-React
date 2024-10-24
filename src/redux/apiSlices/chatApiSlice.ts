import { apiSlice } from "../apiSlice";

const CHAT_URL = "/user/chat";
export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    // Fetch chat history between two users
    fetchChatHistory: builder.query({
      query: (data: { fromUserId: string; toUserId: string }) => ({
        url: `${CHAT_URL}/history/${data.fromUserId}/${data.toUserId}`,
        method: "GET",
      }),
      // Disable caching by setting this to 0 seconds
      keepUnusedDataFor: 0,
      // Refetch every time the component remounts or args change
      refetchOnMountOrArgChange: true,
    }),
    fetchGroupChatHistory: builder.query({
      query: (data: { groupId: string }) => ({
        url: `/user/group/history/${data.groupId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0, // Disable caching
      refetchOnMountOrArgChange: true, // Refetch when groupId changes
    }),
  }),
});

export const {
  useFetchChatHistoryQuery,
  useFetchGroupChatHistoryQuery
} = chatApi;
