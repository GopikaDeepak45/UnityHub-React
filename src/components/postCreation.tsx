// import React, { useState } from 'react';
// import { uploadImage } from '../utils/uploadImage'; // Import your image upload utility function
// import { uploadVideo } from '../utils/uploadVideo'; // Import your video upload utility function
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//   } from "@/components/ui/dialog"
  

// const PostCreationComponent = () => {
//   const [content, setContent] = useState<string>('');
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [imageUrl, setImageUrl] = useState<string>('');
//   const [videoUrl, setVideoUrl] = useState<string>('');
//   const [uploadingImage, setUploadingImage] = useState<boolean>(false);
//   const [uploadingVideo, setUploadingVideo] = useState<boolean>(false);

//   const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setContent(e.target.value);
//   };

//   const handleImageUpload = async (file: File | null) => {
//     if (!file) return;

//     setUploadingImage(true);
//     const result = await uploadImage(file);
//     if (result) {
//       setImageUrl(result.url);
//     }
//     setUploadingImage(false);
//   };

//   const handleVideoUpload = async (file: File | null) => {
//     if (!file) return;

//     setUploadingVideo(true);
//     const result = await uploadVideo(file);
//     if (result) {
//       setVideoUrl(result.url);
//     }
//     setUploadingVideo(false);
//   };

//   const handlePost = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Logic to handle post creation with content, imageUrl, and videoUrl
//     console.log('Content:', content);
//     console.log('Image URL:', imageUrl);
//     console.log('Video URL:', videoUrl);

//     // Reset form state after posting
//     setContent('');
//     setImageFile(null);
//     setVideoFile(null);
//     setImageUrl('');
//     setVideoUrl('');
//   };

//   return (
//     <div className="flex-grow">
//       <div className="border w-[600px] mx-auto my-5 p-5 rounded-lg shadow-lg bg-white">
//         <div className="text-2xl border-b mb-4 pb-2">Create a Post</div>
//         <form onSubmit={handlePost}>
//           {/* Content Input */}
//           <Input
//             value={content}
//             onChange={handleContentChange}
//             placeholder="Enter your content"
//             className="mb-4"
//           />
//           <div className='flex justify-around'>

         
// <Dialog>
//   <DialogTrigger><Button>+ image</Button></DialogTrigger>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>Are you absolutely sure?</DialogTitle>
//       <DialogDescription>{/* Image Upload Section */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Upload Image
//             </label>
//             <Input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 const file = e.target.files?.[0] || null;
//                 setImageFile(file);
//               }}
//               className="mb-2"
//             />
//             {imageFile && (
//               <Button onClick={() => handleImageUpload(imageFile)}>
//                 {uploadingImage ? 'Uploading...' : 'Upload Image'}
//               </Button>
//             )}
//           </div>
//       </DialogDescription>
//     </DialogHeader>
//   </DialogContent>
// </Dialog>
// <Dialog>
//   <DialogTrigger><Button>+ video</Button></DialogTrigger>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>Are you absolutely sure?</DialogTitle>
//       <DialogDescription> {/* Video Upload Section */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Upload Video
//             </label>
//             <Input
//               type="file"
//               accept="video/*"
//               onChange={(e) => {
//                 const file = e.target.files?.[0] || null;
//                 setVideoFile(file);
//               }}
//               className="mb-2"
//             />
//             {videoFile && (
//               <Button onClick={() => handleVideoUpload(videoFile)}>
//                 {uploadingVideo ? 'Uploading...' : 'Upload Video'}
//               </Button>
//             )}
//             </div>
//       </DialogDescription>
//     </DialogHeader>
//   </DialogContent>
// </Dialog>
// </div>
          
// {imageUrl && (
//               <div className="mt-2">
//                 <img src={imageUrl} alt="Uploaded" className="w-[100px]" />
//               </div>
//             )}


// <div className="mb-4">
//             {videoUrl && (
//               <div className="mt-2">
//                 <video controls width="100">
//                   <source src={videoUrl} type={videoFile?.type || ''} />
//                   Your browser does not support the video tag.
//                 </video>
//               </div>
//             )}
//           </div>

//           {/* Post Button */}
//           <Button type="submit" className="float-right">
//             Post
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostCreationComponent;


//for multiple images/videos
import React, { useState } from 'react';
import { uploadImage } from '../utils/uploadImage'; // Import your image upload utility function
import { uploadVideo } from '../utils/uploadVideo'; // Import your video upload utility function
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PostCreationComponent = () => {
  const [content, setContent] = useState<string>('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [uploadingVideo, setUploadingVideo] = useState<boolean>(false);

  // Dialog open state
  const [isImageDialogOpen, setIsImageDialogOpen] = useState<boolean>(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState<boolean>(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleImageUpload = async () => {
    if (imageFiles.length === 0) return;
    setUploadingImage(true);
    const uploadedUrls: string[] = [];
    for (const file of imageFiles) {
      const result = await uploadImage(file);
      if (result) {
        uploadedUrls.push(result.url);
      }
    }
    setImageUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
    setUploadingImage(false);
    setIsImageDialogOpen(false); // Close the dialog after upload
  };

  const handleVideoUpload = async () => {
    if (videoFiles.length === 0) return;
    setUploadingVideo(true);
    const uploadedUrls: string[] = [];
    for (const file of videoFiles) {
      const result = await uploadVideo(file);
      if (result) {
        uploadedUrls.push(result.url);
      }
    }
    setVideoUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
    setUploadingVideo(false);
    setIsVideoDialogOpen(false); // Close the dialog after upload
  };

  const handlePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Logic to handle post creation with content, imageUrls, and videoUrls
    console.log('Content:', content);
    console.log('Image URLs:', imageUrls);
    console.log('Video URLs:', videoUrls);

    // Reset form state after posting
    setContent('');
    setImageFiles([]);
    setVideoFiles([]);
    setImageUrls([]);
    setVideoUrls([]);
  };

  return (
    <div className="flex-grow">
      <div className="border w-[600px] mx-auto my-5 p-5 rounded-lg shadow-lg bg-white">
        <div className="text-2xl border-b mb-4 pb-2">Create a Post</div>
        <form onSubmit={handlePost}>
          {/* Content Input */}
          <Input
            value={content}
            onChange={handleContentChange}
            placeholder="Enter your content"
            className="mb-4"
          />
          <div className='flex justify-around'>
            {/* Image Upload Dialog */}
            <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
              <DialogTrigger><Button>+ image</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Images</DialogTitle>
                  <DialogDescription>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Images
                      </label>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          setImageFiles(files);
                        }}
                        className="mb-2"
                      />
                      {imageFiles.length > 0 && (
                        <Button onClick={handleImageUpload}>
                          {uploadingImage ? 'Uploading...' : 'Upload Images'}
                        </Button>
                      )}
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* Video Upload Dialog */}
            <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
              <DialogTrigger><Button>+ video</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Videos</DialogTitle>
                  <DialogDescription>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Videos
                      </label>
                      <Input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          setVideoFiles(files);
                        }}
                        className="mb-2"
                      />
                      {videoFiles.length > 0 && (
                        <Button onClick={handleVideoUpload}>
                          {uploadingVideo ? 'Uploading...' : 'Upload Videos'}
                        </Button>
                      )}
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          {/* Display Uploaded Images */}
          {imageUrls.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Uploaded ${index}`} className="w-full h-auto" />
              ))}
            </div>
          )}

          {/* Display Uploaded Videos */}
          {videoUrls.length > 0 && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {videoUrls.map((url, index) => (
                <video key={index} controls width="100">
                  <source src={url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          )}
          

          {/* Post Button */}
          <Button type="submit" className="float-right">
            Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostCreationComponent;

