import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { useLikeCommentGroupsMutation, useUnlikeCommentGroupsMutation } from '@/redux/apiSlices/groupApiSlice';

interface LikeButtonProps {
  commentId: string;
  likes: number;
  likesArray:string[]
}

const CommentLikeButtonGroups: React.FC<LikeButtonProps> = ({ commentId, likes,likesArray  }) => {
    const { userId } = useAuth();
   const [likeCommentGroups] = useLikeCommentGroupsMutation();
  const [unlikeCommentGroups] = useUnlikeCommentGroupsMutation();
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
        await unlikeCommentGroups({ commentId, userId });
        setLikeCount((prevCount) => prevCount - 1);
      } else {
        await likeCommentGroups({ commentId, userId });
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

export default CommentLikeButtonGroups;
