import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/Form" 

import MyCard from "@/components/MyCard"; 
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { uploadImage } from "@/utils/uploadImage";
import ErrorComponent from "./ErrorComponent";
import { useAddGroupsMutation } from "@/redux/apiSlices/commAdminApiSlice";
import useAuth from "@/hooks/useAuth";

const formSchema = z.object({
  name:  z.string().trim().min(1, { message: "Name cannot be empty" }).max(50, { message: "Name must be at most 50 characters." }).refine(value => !!value, { message: "Name cannot be empty." }), // Define image type schema
  imageUrl: z.string(),
  publicId:z.string(), // Validate that imageUrl is a valid URL
  shortDescription: z.string().trim().min(1, { message: "Name cannot be empty" }).max(100, { message: "Name must be at most 100 characters." }).refine(value => !!value, { message: "Description cannot be empty." }),
 commAdminId:z.string()
});

// Define FormData type with all form fields
type FormData = z.infer<typeof formSchema>;

const AddGroupsData = ({ refetch }: { refetch: () => void }) => {
    const {userId}=useAuth()
  const [showAddModal, setShowAddModal] = useState(true);
   //for image file data
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
  //****************api hooks************ 
  const [AddGroups]=useAddGroupsMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name:"",
      imageUrl: "",
      publicId:"",
      shortDescription:"",
      commAdminId:userId
    }   
  });

   //supporting methods
   //to manage modal display
  const handleShowAddModal = () => {
    setShowAddModal(true);
  };
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
            message:"Please select an image"
        })
        throw new Error('Please select an image');
      }
      // Upload the selected file to cloudinary and get the URL
      // Upload the selected file to cloudinary and get the URL
      const uploadResult = await uploadImage(selectedFile);
      if (uploadResult === null) {
        form.setError("imageUrl",{
          message:'Please select an image'
        })
        throw new Error('Failed to upload image');
      }
      
      const { url, publicId } = uploadResult;
      if (!url || !publicId ) {
        
        throw new Error('Failed to upload image');
      }

      // Include the image URL in the form data
      const formDataWithImageUrl: FormData = {
        ...values,
        imageUrl: url,
      publicId: publicId,
      };// Make a request to the backend with the form data
      const res:any=await AddGroups (formDataWithImageUrl);
      // Reset the form after successful submission
      
      if (res.error?.data) {
        
        if (res.error.data.message) {
          form.setError("root", {
            message: res.error.data.message
          });
          
        }else{
          form.setError("root", {
            message: res.error.data
          });
      }
      }else{
        refetch()
      setShowAddModal(false)
      form.reset();

      }
      
    } catch (error) {
      return <ErrorComponent/>
    }
  };

  

  return (
    <AlertDialog>
              <AlertDialogTrigger onClick={handleShowAddModal}>Add New Group</AlertDialogTrigger>
              {showAddModal&&(
              <AlertDialogContent>
                <MyCard title="" description="" footer="">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      {form.formState.errors.root && (
                        <FormItem>
                          <FormLabel className="text-destructive">
                          {form.formState.errors.root.message}
                          </FormLabel>
                        </FormItem>
                      )}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Group Name</FormLabel>
                            <FormControl>
                              <Input  {...field}/>
                              
                            </FormControl>
                                    <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={() => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input type="file" onChange={handleFileChange} accept="image/*"  />
                            </FormControl>

                            <FormMessage >{form.formState.errors.imageUrl?.message}</FormMessage>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="shortDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input type="text" {...field}/>
                              
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
                          {form.formState.isSubmitting
                            ? "Loading..."
                            : "Submit"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </MyCard>
              </AlertDialogContent>
              )}
            </AlertDialog>
  )
}

export default AddGroupsData