

import  { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { uploadImage } from "../utils/uploadImage";
import { uploadVideo } from "../utils/uploadVideo"; 
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { useAddPostMutation } from "@/redux/apiSlices/userApiSlice";
import useAuth from "@/hooks/useAuth";
import { useAddPostGroupsMutation } from "@/redux/apiSlices/groupApiSlice";

const formSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: "Content cannot be empty" })
    .max(500, { message: "Content must be at most 500 characters." }),
});

type FormData = z.infer<typeof formSchema>;
interface IGroupData{
  groupId:string
}
const AddPostGroup = ({groupId}:IGroupData) => {
  const{userId}=useAuth()
  const [addPostGroups]=useAddPostGroupsMutation()
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [imageData, setImageData] = useState<Array<{ url: string; publicId: string }>>([]);
  const [videoData, setVideoData] = useState<Array<{ url: string; publicId: string }>>([]);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [uploadingVideo, setUploadingVideo] = useState<boolean>(false);

  // Dialog open state
  const [isImageDialogOpen, setIsImageDialogOpen] = useState<boolean>(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleImageUpload = async () => {
    if (imageFiles.length === 0) return;
    setUploadingImage(true);
    const uploadedFiles: { url: string; publicId: string; }[] = [];
    for (const file of imageFiles) {
      const result = await uploadImage(file);
      if (result) {
        uploadedFiles.push({
          url: result.url,
          publicId: result.publicId,
        });
      }
    }
    setImageData((prevFiles) => [...prevFiles, ...uploadedFiles]);
    setUploadingImage(false);
    setIsImageDialogOpen(false); 
  };

  const handleVideoUpload = async () => {
    if (videoFiles.length === 0) return;
    setUploadingVideo(true);
    const uploadedFiles: { url: string; publicId: string; }[] = [];
    for (const file of videoFiles) {
      const result = await uploadVideo(file);
      if (result) {
        uploadedFiles.push({
          url: result.url,
          publicId: result.publicId,
        });
      }
    }
    setVideoData((prevFiles) => [...prevFiles, ...uploadedFiles]);
    setUploadingVideo(false);
    setIsVideoDialogOpen(false); // Close the dialog after upload
  };

  const onSubmit = async (data: FormData) => {
    try {
      const postData = {
        ...data,
        imageData,
        videoData,
        userId,
        groupId
      };
      addPostGroups(postData)
      
      // Reset form state after posting
      form.reset()
      setImageFiles([]);
      setVideoFiles([]);
      setImageData([]);
      setVideoData([]);
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <div className="flex-grow rounded-lg ">
      <div className="border w-full  lg:max-w-[500px] mx-auto mb-8 p-5 rounded-lg shadow-lg bg-white relative">
        <div className="text-xl border-b mb-4 pb-2 ">
          Do you want to share something?
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {form.formState.errors.root && (
              <FormItem>
                <FormLabel className="text-destructive">
                  {form.formState.errors.root.message}
                </FormLabel>
              </FormItem>
            )}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your content"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.content?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Display Uploaded Images */}
            {imageData.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {imageData.map((data, index) => (
                  <img
                    key={index}
                    src={data.url}
                    alt={`Uploaded ${index}`}
                    className="w-full h-auto"
                  />
                ))}
              </div>
            )}

            {/* Display Uploaded Videos */}
            {videoData.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {videoData.map((data, index) => (
                  <video key={index} controls width="100">
                    <source src={data.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ))}
              </div>
            )}
            <div className="flex gap-10 mt-2">
              {/* Image Upload Dialog */}
              <Dialog
                open={isImageDialogOpen}
                onOpenChange={setIsImageDialogOpen}
              >
                <DialogTrigger className="bg-slate-600 rounded-md px-2 text-white text-[10px]">
                  + image
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Images</DialogTitle>
                    <DialogDescription>
                      <div className="mb-4">
                        
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
                            {uploadingImage ? "Uploading..." : "Upload Images"}
                          </Button>
                        )}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              {/* Video Upload Dialog */}
              <Dialog
                open={isVideoDialogOpen}
                onOpenChange={setIsVideoDialogOpen}
              >
                <DialogTrigger className="bg-slate-600 rounded-md p-2 text-white">
                  + video
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Videos</DialogTitle>
                    <DialogDescription>
                      <div className="mb-4">
                        
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
                            {uploadingVideo ? "Uploading..." : "Upload Videos"}
                          </Button>
                        )}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            {/* Post Button */}

            <Button
              className="absolute right-0 bottom-[-2px] px-10 bg-slate-800 text-white"
              type="submit"
              disabled={form.formState.isSubmitting}
              variant={"bg1"}
            >
              {form.formState.isSubmitting ? "Loading..." : "Post"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddPostGroup;

