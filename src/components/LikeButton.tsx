import { useState, useEffect } from 'react';
import { useLikePostMutation, useUnlikePostMutation } from '@/redux/apiSlices/postApiSlice';
import { Heart } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

interface LikeButtonProps {
  postId: string;
  likes: number
  likesArray:string[]
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, likes,likesArray  }) => {
  const { userId } = useAuth();
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);
  // Check if the current user has already liked the post
  useEffect(() => {
    if (userId && likesArray.includes(userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likesArray, userId]);

  const handleLike = async () => {
    try {
      if (liked) {
        await unlikePost({ postId, userId });
        setLikeCount((prevCount) => prevCount - 1);
      } else {
        await likePost({ postId, userId });
        setLikeCount((prevCount) => prevCount + 1);
      }
      setLiked((prevLiked) => !prevLiked);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center p-2 bg-white rounded-full shadow hover:bg-gray-100 focus:outline-none transition-colors"
    >
      <Heart
        className={`w-6 h-6 transition-colors ${
          liked ? 'text-red-500' : 'text-gray-500'
        }`}
        fill={liked ? 'currentColor' : 'none'}
      />
      <span className="ml-2 text-sm font-medium text-gray-700">{likeCount}</span>
    </button>
  );
};

export default LikeButton;









{/* like unlike 

import { useState } from 'react';
import { useLikePostMutation } from '@/redux/apiSlices/postApiSlice';
import { Heart, HeartFill } from 'lucide-react'; // Import the icons from Lucide

interface LikeButtonProps {
  postId: string;
  likes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, likes }) => {
  const [likePost] = useLikePostMutation();
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      await likePost(postId);
      setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
      setLiked((prevLiked) => !prevLiked);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <button onClick={handleLike} className="like-button">
      {liked ? (
        <HeartFill className="text-red-500" size={24} /> // Filled heart for liked state
      ) : (
        <Heart className="text-gray-500" size={24} /> // Outline heart for unliked state
      )}
      <span className="ml-2">{likeCount}</span>
    </button>
  );
};

export default LikeButton;
*/}

// import { useLikePostMutation } from "@/redux/apiSlices/postApiSlice";
// import { useState } from "react";
// import { ThumbsUp, ThumbsDown } from "lucide-react";

// interface LikeButtonProps {
//     postId: string;
//     likes: number;
//   }
  
//   const LikeButton: React.FC<LikeButtonProps> = ({ postId, likes }) => {
//     const [likePost] = useLikePostMutation();
//     const [likeCount, setLikeCount] = useState(likes);
//     const [liked, setLiked] = useState(false);
  
//     const handleLike = async () => {
//       try {
//         await likePost(postId)
//         setLikeCount((prevCount: number) => (liked ? prevCount - 1 : prevCount + 1));
//         setLiked((prevLiked: any) => !prevLiked);
//       } catch (error) {
//         console.error('Error liking post:', error);
//       }
//     };
  
//     return (
//       <button onClick={handleLike}>
//         {liked ? 'Unlike' : 'Like'} ({likeCount})
//       </button>
//     );
//   };

//   export default LikeButton