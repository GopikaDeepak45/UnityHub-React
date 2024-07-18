import { z } from "zod"
// import MyCard from "./MyCard"
// import {Form, FormItem, FormLabel, FormField, FormControl, FormDescription, FormMessage } from "./ui/Form"
import {  AlertDialogCancel, AlertDialogContent, } from "./ui/alert-dialog"
// import { Button } from "./ui/button"
// import { Input } from "./ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { uploadImage } from "@/utils/uploadImage"
import MyCard from "./MyCard"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "./ui/Form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useAddCommunityBannerImageMutation } from "@/redux/apiSlices/commAdminApiSlice"

const formSchema = z.object({
    imageType: z.string(), 
    imageUrl: z.string(), 
    publicId:z.string(),
    commId:z.string()
  });
  type FormData = z.infer<typeof formSchema>;

const AddCommunityImages = ({ refetch,setShowAddImageModal,commId }: { refetch: () => void,setShowAddImageModal:(show: boolean) => void,commId:string }) => {

 const[addCommunityBannerImage] =useAddCommunityBannerImageMutation(undefined)
   //for image file data
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageType: "banner",
      imageUrl: "",
      publicId:"",
      commId:commId
    },
  });
  //to take file input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const onSubmit = async (values: FormData) => {
    try {
      if (!selectedFile) {
        form.setError("imageUrl",{
          message:'Please select an image'
        })
        throw new Error('Please select an image');
      }
      

      // Upload the selected file to cloudinary and get the URL
      const uploadResult = await uploadImage(selectedFile);
      if (!uploadResult) {
        throw new Error('Failed to upload image');
      }
      
      const { url, publicId } = uploadResult;

      if (!url || !publicId ) {
        throw new Error('Failed to upload image');
      }

      //Include the image URL in the form data
      const formDataWithImageUrl: FormData = {
        ...values,
        imageUrl: url,
      publicId,
      commId
      };

      //Make a request to the backend with the form data
      await addCommunityBannerImage(formDataWithImageUrl);
      //Reset the form after successful submission
      refetch()
      setShowAddImageModal(false)
      form.reset();
      
      //window.location.reload()

    } catch (error) {
      console.error("Error submitting form:", error);
      form.setError("root", {
        message: "Error adding image"
      });
    }
  };
  return (
    <AlertDialogContent>
    <MyCard title="Add Banner Image" description="" footer="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"

        >
          {form.formState.errors.root && (
            <FormItem>
              <FormLabel className="text-destructive">
                Error adding new image
              </FormLabel>
            </FormItem>
          )}
         
          <FormField
            control={form.control}
            name="imageUrl"
            render={() => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input type="file" onChange={handleFileChange} accept="image/*" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-around">
            {!form.formState.isSubmitting&&(
               <AlertDialogCancel>Cancel</AlertDialogCancel>
            )}
           

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              variant={"bg1"}
            >
              {form.formState.isSubmitting?
              //   ?<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                
              // </svg>
              "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </MyCard>
  </AlertDialogContent>

  )
}

export default AddCommunityImages

