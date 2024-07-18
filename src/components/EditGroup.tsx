import React, { useState } from 'react';
import {

  AlertDialogCancel,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MyCard from "@/components/MyCard";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImage } from "@/utils/uploadImage";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/Form';
import { useEditGroupMutation } from '@/redux/apiSlices/commAdminApiSlice';
import useAuth from '@/hooks/useAuth';

const formSchema = z.object({
  communityAdminId:z.string().optional(),
  id: z.string().optional(),
  name:  z.string().trim().min(1, { message: "Name cannot be empty" }).max(50, { message: "Name must be at most 50 characters." }).refine(value => !!value, { message: "Name cannot be empty." }), // Define image type schema
  imageUrl: z.string(),
  publicId:z.string(), // Validate that imageUrl is a valid URL
  description: z.string().trim().min(1, { message: "Name cannot be empty" }).max(100, { message: "Name must be at most 100 characters." }).refine(value => !!value, { message: "Description cannot be empty." }),
});

type FormData = z.infer<typeof formSchema>;

const EditGroup = ({ refetch, groupsData, setShowEditModal }: { refetch: () => void, setShowEditModal: (show: boolean) => void, groupsData: any }) => {
  const{userId}=useAuth()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      communityAdminId:userId,
      id: groupsData._id,
      name: groupsData.name,
      imageUrl: groupsData.image.url,
      publicId: groupsData.image.publicId,
      description: groupsData.description,
    }
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editGroup]=useEditGroupMutation()
  const [image] = useState(groupsData.image.url)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const onSubmit = async (values: FormData) => {
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

      const res: any = await editGroup(formDataWithImageUrl);

      if (res.error?.data?.message) {
        form.setError("root", { message: res.error.data.message });
      } else {
        form.reset();
        refetch();
        setShowEditModal(false)

      }
    } catch (error) {
      form.setError("root", { message: "Error editing Core Package" });
    }
  };

  return (
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
                    <Input  {...field} />

                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <img src={image} className="w-[200px]" />

            <FormField
              control={form.control}
              name="imageUrl"
              render={() => (
                <FormItem>
                  <FormLabel>Choose Another Image</FormLabel>
                  <FormControl>
                    <Input type="file" onChange={handleFileChange} accept="image/*" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />

                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-around">
              {!form.formState.isSubmitting && (
                <AlertDialogCancel onClick={() => setShowEditModal(false)}>Cancel</AlertDialogCancel>
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
  );
};

export default EditGroup;
