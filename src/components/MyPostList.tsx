import { useFetchMyPostsQuery } from "@/redux/apiSlices/postApiSlice";
import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import useAuth from "@/hooks/useAuth";
import InfiniteScroll from "react-infinite-scroll-component";
import ErrorComponent from "./ErrorComponent";

// Define the Post interface
interface Post {
    _id: string;
    userId: { _id: string; userName: string };
    content: string;
    communityId: string;
    media: { data: { url: string; publicId: string }; type: 'image' | 'video' }[];
    comments: { _id: string; userId: { _id: string; userName: string }; content: string; createdAt: string }[];
    createdAt: string;
    likes: string[];
  }
  
  const MyPostList = () => {
    const {userId}=useAuth()
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<Post[]>([]);
    const [hasMore, setHasMore] = useState(true);
  
    const { data, isFetching, isSuccess,error } = useFetchMyPostsQuery({ userId, page, limit: 4 }, { skip: !hasMore });
 

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
          <PostItem key={post._id} post={post} />
        ))}
        {isFetching && <div>Loading...</div>}
        </InfiniteScroll>
    );
  };
  export default MyPostList


{/*  
  <InfiniteScroll
  dataLength={posts.length}   // Length of the data array (posts) to track changes
  next={fetchNextPage}        // Function to call when reaching the bottom of the scrollable area
  hasMore={hasMore}           // Boolean indicating whether there are more items to load
  loader={<h4>Loading...</h4>}   // JSX element shown while loading more data
  endMessage={<p>No more posts to load</p>}   // JSX element displayed when all items have been loaded
>
  {/* Content inside InfiniteScroll }
  {posts.map((post) => (
    <PostItem key={post._id} post={post} />   // Render each post using PostItem component
  ))}

  {/* Show additional loader if still fetching }
  {isFetching && <div>Loading...</div>}
</InfiniteScroll>
 
  */}

