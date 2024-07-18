
import React, { useState } from 'react';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';
import { MessageCircleMore } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

// Define the Post interface
interface Post {
  _id: string;
  userId: { _id: string; userName: string; profileImg?: { url: string } };
  content: string;
  communityId: string;
  media: { data: { url: string; publicId: string }; type: 'image' | 'video' }[];
  comments: { _id: string; userId: { _id: string; userName: string }; content: string; createdAt: string }[];
  createdAt: string;
  likes: string[];
}

interface PostItemProps {
  post: Post;
}

const GroupsPostItem: React.FC<PostItemProps> = ({ post }) => {
  const{userId}=useAuth()
  const defaultProfileImg = "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg";
  const userImg = post.userId.profileImg?.url || defaultProfileImg;
  const [showComments, setShowComments] = useState(false); // State to toggle comments visibility

  return (
    <div className="max-w-2xl mx-auto my-6  rounded-lg shadow-lg transition-transform duration-500 hover:scale-100 hover:shadow-2xl">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img className="w-12 h-12 rounded-full" src={userImg} alt="User profile" />
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-800">
             
              {post.userId._id === userId ? 'Me' : post.userId.userName}
              </h2>
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <div className="text-gray-700 mb-4">
          {post.content}
        </div>
        <div className="mb-4">
          {post.media.map((mediaItem) => (
            <div key={mediaItem.data.publicId} className="my-2">
              {mediaItem.type === 'image' ? (
                <img className="w-full h-auto rounded-lg" src={mediaItem.data.url} alt="Post media" />
              ) : (
                <video className="w-full h-auto rounded-lg" controls>
                  <source src={mediaItem.data.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between px-5 items-center">
          <LikeButton postId={post._id} likes={post.likes.length} likesArray={post.likes} />
          {/* <CommentSection comments={post.comments} postId={post._id} /> */}
          <div >
            <MessageCircleMore
              className="cursor-pointer text-gray-600 hover:text-gray-900 mr-2"
              onClick={() => setShowComments(!showComments)}
            />
            
          </div>
        </div>
       
        {showComments && <CommentSection  postId={post._id} />}
       
        
      </div>
    </div>
  );
};

export default GroupsPostItem;
