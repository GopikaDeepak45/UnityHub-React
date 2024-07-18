import { useFetchPostsQuery } from "@/redux/apiSlices/postApiSlice";
import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import useAuth from "@/hooks/useAuth";
import InfiniteScroll from "react-infinite-scroll-component";
import ErrorComponent from "./ErrorComponent";
import { useFetchPostsGroupsQuery } from "@/redux/apiSlices/groupApiSlice";
import PostItemGroups from "./PostItemGroups";

// Define the Post interface
interface Post {
    _id: string;
    groupId:string;
    userId: { _id: string; userName: string };
    content: string;
    communityId: string;
    media: { data: { url: string; publicId: string }; type: 'image' | 'video' }[];
    comments: { _id: string; userId: { _id: string; userName: string }; content: string; createdAt: string }[];
    createdAt: string;
    likes: string[];
  }
  interface IGroupsPostList{
    groupId:string
  }
  const GroupsPostList = ({groupId}:IGroupsPostList) => {
    const {userId}=useAuth()
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<Post[]>([]);
    const [hasMore, setHasMore] = useState(true);
  
    const { data, isFetching, isSuccess,error } = useFetchPostsGroupsQuery({ userId,groupId, page, limit: 4 }, { skip: !hasMore });
  
    // Update posts state when fetching posts
    useEffect(() => {
      if (isSuccess && data) {
        
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setHasMore(data.hasMore);
      }
    }, [data]);

    const fetchNextPage = () => {
        if (!isFetching && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      };
      if (error) return <ErrorComponent message={error.data.message} />;
    return (
      <InfiniteScroll
      dataLength={posts.length}
      next={fetchNextPage}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more posts to load</p>}
      
    >
        {posts.map((post) => (
          <PostItemGroups key={post._id} post={post} />
        ))}
        {isFetching && <div>Loading...</div>}
        </InfiniteScroll>
    );
  };
  export default GroupsPostList
