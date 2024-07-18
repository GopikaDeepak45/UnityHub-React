"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import pic1 from "../../assets/pic1.png";
import handsPic from '../../assets/hands.png'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/Form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MyCard from "@/components/MyCard";
import { useForm } from "react-hook-form";
import { useAddImageMutation, useDeleteImageMutation } from "@/redux/apiSlices/adminApiSlice";
import { uploadImage } from "@/utils/uploadImage";
import { useState } from "react";
import { useGetLandingPageQuery } from "@/redux/apiSlices/landingPageSlice";
import CustomAlertButton from "@/components/CustomAlert";
import Overlay from "@/components/OverLay";
import ErrorComponent from "@/components/ErrorComponent";
import ProgressDemo from "@/components/ProgressDemo";

const formSchema = z.object({
  imageType: z.enum(['hero', 'about', 'common']), // Define image type schema
  imageUrl: z.string(), // Validate that imageUrl is a valid URL
  publicId:z.string()
});

// Define FormData type with all form fields
type FormData = z.infer<typeof formSchema>;

const AdminImages = () => {
console.log('Admin Images page rendred')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageType: "hero",
      imageUrl: "",
      publicId:""
    },
  });
  //****************api hooks************
  const { data: landingPageData, error, isLoading,refetch } = useGetLandingPageQuery(undefined);
  
  if (isLoading) return  <ProgressDemo isLoading={isLoading} />;
  if (error) return <ErrorComponent />;

  const [addImage] = useAddImageMutation()
  const [deleteImage] = useDeleteImageMutation()

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  //for overlay all images
  const [showOverlay, setShowOverlay] = useState(false);
  //for add image modal
  const [showAddImageModal, setShowAddImageModal] = useState(false);

  const handleShowAddImageModal = () => {
    setShowAddImageModal(true);
  };

  
  //to take file input
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  const deleteImageHandler = async (imageType: string, imageUrl: string,publicId:string) => {
    try {
      await deleteImage({ imageType, imageUrl,publicId })
      refetch()
     // window.location.reload();
    
     refetch()
     
     
    } catch (e) {

    }
  }
  //form add image submit
  const onSubmit = async (values: FormData) => {
    try {
      if (!selectedFile) {
       
        form.setError("root", {
          message: "Select an Image"
        });
        return
      }
      

      // Upload the selected file to cloudinary and get the URL
      const uploadResult = await uploadImage(selectedFile);
      if (uploadResult === null) {
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
      };

      // Make a request to the backend with the form data
      await addImage(formDataWithImageUrl);
      // Reset the form after successful submission
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
 
  if (!landingPageData) {
    return <>
    <div className="flex justify-center text-4xl">No data available...
    </div>
    <div className="border border-green-800  p-2 rounded-md min-w-36 max-w-48 text-center">

        <AlertDialog >
          <AlertDialogTrigger onClick={handleShowAddImageModal}>Add New Image</AlertDialogTrigger>
          {showAddImageModal&&(
          <AlertDialogContent>
            <MyCard title="Login" description="" footer="">
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
                    name="imageType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Type</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            value={field.value}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

                          >
                            <option value="hero" >Hero Image</option>
                            <option value="about">About Image</option>
                            <option value="common">
                              Common Images
                            </option>
                          </select>
                        </FormControl>
                        <FormDescription></FormDescription>
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
          )}
        </AlertDialog>

      </div>
    </>;
  }
  
  return (
    <div className="ml-10">
      <h1 className="text-2xl font-semibold m-10">Images</h1>
      {/* Add new image portion, form also*/}

      <div className="border border-green-800  p-2 rounded-md min-w-36 max-w-48 text-center">

        <AlertDialog >
          <AlertDialogTrigger onClick={handleShowAddImageModal}>Add New Image</AlertDialogTrigger>
          {showAddImageModal&&(
          <AlertDialogContent>
            <MyCard title="Login" description="" footer="">
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
                    name="imageType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Type</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            value={field.value}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

                          >
                            <option value="hero" >Hero Image</option>
                            <option value="about">About Image</option>
                            <option value="common">
                              Common Images
                            </option>
                          </select>
                        </FormControl>
                        <FormDescription></FormDescription>
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

      </div>

      {/*Table contents */}
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl No:</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Images</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>Hero Image</TableCell>
            <TableCell>
              <img src={landingPageData?.hero?.url || handsPic} alt="" className="w-[200px] mx-auto" />
            </TableCell>
            {!landingPageData?.hero&&<TableCell>Default image</TableCell>}
            {landingPageData?.hero && (
              <TableCell >
                <CustomAlertButton
                  title="Are you absolutely sure?"
                  description="This action cannot be undone. This will permanently delete the image."
                  cancelText="Cancel"
                  confirmText="Continue"
                  onConfirm={() => deleteImageHandler('hero', landingPageData?.hero.url,landingPageData?.hero.publicId)}
                >
                  <Button className="bg-red-300 p-2 text-black ml-2 hover:bg-red-500">
                    Delete
                  </Button>
                </CustomAlertButton>

              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">2</TableCell>
            <TableCell>About Image</TableCell>
            <TableCell>
              <img src={landingPageData?.about?.image.url || pic1} alt="" className="w-[200px] mx-auto" />
            </TableCell>
            {!landingPageData?.about?.image&&<TableCell>Default image</TableCell>}
            {landingPageData?.about?.image && (
              <TableCell >
                <CustomAlertButton
                  title="Are you absolutely sure?"
                  description="This action cannot be undone. This will permanently delete the image."
                  cancelText="Cancel"
                  confirmText="Continue"
                  onConfirm={() => deleteImageHandler('about', landingPageData?.about?.image.url,landingPageData?.about.image.publicId)}
                >
                  <Button className="bg-red-300 p-2 text-black ml-2 hover:bg-red-500">
                    Delete
                  </Button>
                </CustomAlertButton>
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">3</TableCell>
            <TableCell>Common Images</TableCell>
            <TableCell>
              {landingPageData.images && landingPageData.images.length > 0 && (
                <>
                  {landingPageData.images.slice(0, landingPageData.images.length > 3 ? 3 : landingPageData.images.length).map((image: {url:string,publicId:string}, index: number) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`Common Image ${index + 1}`}
                      className="w-[200px] p-2 mx-auto"
                    />
                  ))}
                  {/* Check if there are more than three images */}
                  {landingPageData.images.length > 3 && (
                    <span className="text-lg">...</span>
                  )}
                </>
              )}
            </TableCell>
            <TableCell >
              <Button variant={"bg1"} onClick={() => setShowOverlay(true)}>See All</Button>
              {showOverlay && (
                <Overlay onClose={() => setShowOverlay(false)}>
                  <div className="flex flex-wrap gap-5">
                    {landingPageData.images.map((image: {url:string,publicId:string}, index: number) => (
                      <div key={index} className="relative">
                        <img
                          src={image.url}
                          alt={`Common Image ${index + 1}`}
                          className="w-[200px] mr-2"
                        />
                        <CustomAlertButton
                          title="Are you absolutely sure?"
                          description="This action cannot be undone. This will permanently delete the image."
                          cancelText="Cancel"
                          confirmText="Continue"
                          onConfirm={() => deleteImageHandler('common', image.url,image.publicId)}
                        >
                          <Button className="absolute top-0 right-0 px-3 bg-red-300 text-black rounded-full">
                            X
                          </Button>
                        </CustomAlertButton>

                      </div>
                    ))}
                  </div>
                </Overlay>
              )}

            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminImages;
