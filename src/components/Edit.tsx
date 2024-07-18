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
import { useEditCorePackageMutation } from "@/redux/apiSlices/adminApiSlice";
const formSchema = z.object({
  name:  z.string().trim().min(1, { message: "Name cannot be empty" }).max(50, { message: "Name must be at most 50 characters." }).refine(value => !!value, { message: "Name cannot be empty." }), // Define image type schema
  imageUrl: z.string(),
  publicId:z.string(), // Validate that imageUrl is a valid URL
  shortDescription: z.string().trim().min(1, { message: "Name cannot be empty" }).max(100, { message: "Name must be at most 100 characters." }).refine(value => !!value, { message: "Description cannot be empty." }),
});

// Define FormData type with all form fields
type FormData = z.infer<typeof formSchema>;

const AddCorePackage = ({ refetch, packageData }: { refetch: () => void, packageData: any }) => {
  const [showAddModal, setShowAddModal] = useState(true);
   //for image file data
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
  //****************api hooks************ 
  const [editCorePackage] = useEditCorePackageMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        name: packageData.name,
        imageUrl: packageData.image.url,
        publicId: packageData.image.publicId,
        shortDescription: packageData.shortDescription,
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
    console.log('edit val',values)
    try {
      let imageUrl = values.imageUrl;
      let publicId = values.publicId;

      if (selectedFile) {
        const uploadResult = await uploadImage(selectedFile);
        if (!uploadResult?.url || !uploadResult?.publicId) {
          throw new Error('Failed to upload image');
        }
        imageUrl = uploadResult.url;
        publicId = uploadResult.publicId;
      }

      const formDataWithImageUrl: FormData = {
        ...values,
        imageUrl,
        publicId,
      };

      const res: any = await editCorePackage(formDataWithImageUrl);

      if (res.error?.data?.message) {
        form.setError("root", { message: res.error.data.message });
      } else {
        refetch();
        form.reset();
      }
    } catch (error) {
      form.setError("root", { message: "Error editing Core Package" });
    }
  };

  

  return (
    <AlertDialog>
              <AlertDialogTrigger onClick={handleShowAddModal}>Add New Package</AlertDialogTrigger>
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
                            <FormLabel>Package Name</FormLabel>
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

                            <FormMessage />
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

export default AddCorePackage