import  { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useAuth from '@/hooks/useAuth';
import { useFetchPostsQuery } from '@/redux/apiSlices/postApiSlice';
// Define the Post interface
interface Post {
    _id: string;
    userId: { _id: string; username: string };
    content: string;
    communityId: string;
    media: { data: { url: string; publicId: string }; type: 'image' | 'video' }[];
    comments: { _id: string; userId: { _id: string; username: string }; content: string; createdAt: string }[];
    createdAt: string;
    likes: string[];
  }
const PostsList = () => {
    const{userId}=useAuth()
    const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching, isSuccess } = useFetchPostsQuery({ userId, page, limit: 10 }, { skip: !hasMore });
  
    // Update posts state when fetching posts
    useEffect(() => {
      if (isSuccess && data) {
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setHasMore(data.hasMore);
      }
    }, [data, isSuccess]);
    const fetchNextPage = () => {
        if (!isFetching && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      };
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchNextPage}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more posts to load</p>}
    >
      {posts.map((post) => (
        <div key={post._id} className="post">
          <div className="post-header">
            <h3>{post.userId.username}</h3>
            <p>{new Date(post.createdAt).toLocaleString()}</p>
          </div>
          <div className="post-content">
            <p>{post.content}</p>
            {post.media.map((mediaItem, index) => (
              <div key={index} className="post-media">
                {mediaItem.type === 'image' ? (
                  <img src={mediaItem.data.url} alt="media" />
                ) : (
                  <video src={mediaItem.data.url} controls />
                )}
              </div>
            ))}
          </div>
          <div className="post-interactions">
            <p>{post.likes.length} Likes</p>
            <p>{post.comments.length} Comments</p>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default PostsList;
