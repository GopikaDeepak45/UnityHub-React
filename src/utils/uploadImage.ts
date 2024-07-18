// utils/uploadImage.ts

export const uploadImage = async (file: File): Promise<{ url: string, publicId: string } | null> => {
  console.log('upload image rendered')
    try {
        console.log('upload img called')
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'unity-hub'); 
  
      const response = await fetch('https://api.cloudinary.com/v1_1/dpnzktqbd/image/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      return ({url:data.secure_url,publicId:data.public_id});
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };
  