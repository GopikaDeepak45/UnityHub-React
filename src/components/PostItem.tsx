

// import React, { useState } from 'react';
// import LikeButton from './LikeButton';
// import CommentSection from './CommentSection';
// import { Edit, MessageCircleMore, Trash } from 'lucide-react';
// import useAuth from '@/hooks/useAuth';
// import { useDeletePostMutation } from '@/redux/apiSlices/postApiSlice';
// import ErrorComponent from './ErrorComponent';
// import { error } from 'console';

// // Define the Post interface
// interface Post {
//   _id: string;
//   userId: { _id: string; userName: string; profileImg?: { url: string } };
//   content: string;
//   communityId: string;
//   media: { data: { url: string; publicId: string }; type: 'image' | 'video' }[];
//   comments: { _id: string; userId: { _id: string; userName: string }; content: string; createdAt: string }[];
//   createdAt: string;
//   likes: string[];
// }

// interface PostItemProps {
//   post: Post;
// }

// const PostItem: React.FC<PostItemProps> = ({ post }) => {
//   const{userId}=useAuth()
//   const[deletePost]=useDeletePostMutation()
//   const defaultProfileImg = "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg";
//   const userImg = post.userId.profileImg?.url || defaultProfileImg;
//   const [showComments, setShowComments] = useState(false); // State to toggle comments visibility

//   const handleDeletePost = async ({ postId }: { postId: string }) => {
//   try {
//     console.log('going to call api delete post')
//     await deletePost({ postId, userId });
//   } catch (e) {
//     console.log('error delete post', e);
//   }
// };


//   const handleEditPost = () => {
//     // Execute edit logic here
//    // Call the onEdit function passed from props
//   };
//   return (
   
//     <div className="max-w-2xl mx-auto my-6 bg-white rounded-lg shadow-lg transition-transform duration-500 hover:scale-100 hover:shadow-2xl p-2">
//       <div className="p-4">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center">
//             <img className="w-12 h-12 rounded-full" src={userImg} alt="User profile" />
//             <div className="ml-4">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 {post.userId._id === userId ? 'Me' : post.userId.userName}
//               </h2>
//               <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
//             </div>
//           </div>
//           {post.userId._id === userId && (
//             <div className="flex">
//                <button className="text-gray-600 hover:text-red-600 mr-2" onClick={handleEditPost}>
//                 <Edit size={20} />
//               </button> 
//               <button className="text-gray-600 hover:text-red-600" onClick={()=>handleDeletePost({postId:post._id})}>
//                 <Trash size={20} />
//               </button>
//             </div>
//           )}
//         </div>
//         <div className="text-gray-700 mb-4">
//           {post.content}
//         </div>
//         <div className="mb-4">
//           {post.media.map((mediaItem) => (
//             <div key={mediaItem.data.publicId} className="my-2">
//               {mediaItem.type === 'image' ? (
//                 <img className="w-full h-auto rounded-lg" src={mediaItem.data.url} alt="Post media" />
//               ) : (
//                 <video className="w-full h-auto rounded-lg" controls>
//                   <source src={mediaItem.data.url} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//               )}
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-between px-5 items-center">
//           <LikeButton postId={post._id} likes={post.likes.length} likesArray={post.likes} />
//           <div>
//             <MessageCircleMore
//               className="cursor-pointer text-gray-600 hover:text-gray-900 mr-2"
//               onClick={() => setShowComments(!showComments)}
//             />
//           </div>
//         </div>
//         {showComments && <CommentSection postId={post._id} />}
//       </div>
//     </div>
//   );
// };

// export default PostItem;


import React, { useState } from 'react';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';
import { Edit, MessageCircleMore, Trash, Check, X } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { useDeletePostMutation, } from '@/redux/apiSlices/postApiSlice';


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

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { userId } = useAuth();
  const [deletePost] = useDeletePostMutation();
  // const [updatePost] = useUpdatePostMutation();
  const defaultProfileImg = "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg";
  const userImg = post.userId.profileImg?.url || defaultProfileImg;
  const [showComments, setShowComments] = useState(false); // State to toggle comments visibility
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [editedContent, setEditedContent] = useState(post.content); // State to store edited content

  const handleDeletePost = async ({ postId }: { postId: string }) => {
    try {
      await deletePost({ postId, userId });
    } catch (e) {
      console.log('Error deleting post', e);
    }
  };

  const handleEditPost = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    // try {
    //   await updatePost({ postId: post._id, content: editedContent }).unwrap();
    //   setIsEditing(false);
    // } catch (e) {
    //   console.log('Error updating post', e);
    // }
  };

  const handleCancelEdit = () => {
    setEditedContent(post.content);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto my-6 bg-white rounded-lg shadow-lg transition-transform duration-500 hover:scale-100 hover:shadow-2xl p-2">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img className="w-12 h-12 rounded-full" src={userImg} alt="User profile" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {post.userId._id === userId ? 'Me' : post.userId.userName}
              </h2>
              <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
            </div>
          </div>
          {post.userId._id === userId && (
            <div className="flex">
              {isEditing ? (
                <>
                  <button className="text-gray-600 hover:text-green-600 mr-2" onClick={handleSaveEdit}>
                    <Check size={20} />
                  </button>
                  <button className="text-gray-600 hover:text-red-600" onClick={handleCancelEdit}>
                    <X size={20} />
                  </button>
                </>
              ) : (
                <>
                  {/* <button className="text-gray-600 hover:text-blue-600 mr-2" onClick={handleEditPost}>
                    <Edit size={20} />
                  </button> */}
                  <button className="text-gray-600 hover:text-red-600" onClick={() => handleDeletePost({ postId: post._id })}>
                    <Trash size={20} />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <div className="text-gray-700 mb-4">
          {isEditing ? (
            <textarea
              className="w-full p-2 border rounded"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            post.content
          )}
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
          <div>
            <MessageCircleMore
              className="cursor-pointer text-gray-600 hover:text-gray-900 mr-2"
              onClick={() => setShowComments(!showComments)}
            />
          </div>
        </div>
        {showComments && <CommentSection postId={post._id} />}
      </div>
    </div>
  );
};

export default PostItem;


