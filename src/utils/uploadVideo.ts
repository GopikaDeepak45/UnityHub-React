// utils/uploadVideo.ts

export const uploadVideo = async (file: File): Promise<{ url: string, publicId: string } | null> => {
    console.log('upload video function rendered');
    try {
      console.log('upload video called');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'unity-hub'); // Use your video upload preset
    
      const response = await fetch('https://api.cloudinary.com/v1_1/dpnzktqbd/video/upload', {
        method: 'POST',
        body: formData,
      });
    
      const data = await response.json();
      return { url: data.secure_url, publicId: data.public_id };
    } catch (error) {
      console.error("Error uploading video:", error);
      return null;
    }
  };
  