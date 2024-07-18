// // VideoUploadComponent.jsx
// import { uploadVideo } from '@/utils/uploadVideo';
// import React, { useState } from 'react';

// const VideoUploadComponent = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [videoUrl, setVideoUrl] = useState<string>('');
//   const [uploading, setUploading] = useState<boolean>(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     setUploading(true);
//     const result = await uploadVideo(file);

//     if (result) {
//       setVideoUrl(result.url);
//       console.log("Uploaded video URL:", result.url);
//     } else {
//       console.error("Failed to upload video.");
//     }

//     setUploading(false);
//   };

//   return (
//     <div>
//       <input type="file" accept="video/*" onChange={handleFileChange} />
//       {uploading ? (
//         <p>Uploading...</p>
//       ) : (
//         <button onClick={handleUpload}>Upload</button>
//       )}
//       {videoUrl && (
//         <video controls width="300">
//           <source src={videoUrl} type={file?.type} />
//           Your browser does not support the video tag.
//         </video>
//       )}
//     </div>
//   );
// };

// // export default VideoUploadComponent;
// import React, { useState } from 'react';
// import { Button } from './ui/button';
// const VideoUploadComponent = ({ onUpload }) => {
//   const [videoFile, setVideoFile] = useState(null);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setVideoFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = () => {
//     if (videoFile) {
//       onUpload(videoFile);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept="video/*"
//         onChange={handleFileChange}
//         className="mb-2"
//       />
//       {videoFile && (
//         <Button onClick={handleUpload}>Upload Video</Button>
//       )}
//     </div>
//   );
// };

// export default VideoUploadComponent;
