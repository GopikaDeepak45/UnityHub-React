import useAuth from "@/hooks/useAuth";
import {
  useUpdateUserMutation,
  useUserInfoQuery,
} from "@/redux/apiSlices/userApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MyCard from "./MyCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ProgressDemo from "./ProgressDemo";
import ErrorComponent from "./ErrorComponent";
import { useEffect, useState } from "react";
import profileImage from "../assets/profile.png";
import { uploadImage } from "@/utils/uploadImage";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: "Name cannot be empty" })
    .max(50, { message: "Name must be at most 50 characters." })
    .refine((value) => !!value, { message: "Name cannot be empty." }),
  email: z.string().email({ message: "Invalid email address" }),
  contactNo: z
    .string()
    .trim()
    .min(1, { message: "Cannot be empty" })
    .max(10, { message: "Mobile number must be a 10-digit number." })
    .length(10, { message: "Mobile number must be exactly 10 digits." })
    .refine(value => /^[0-9]+$/.test(value), { message: "Contact Number must contain numbers only ." }),
  imageUrl: z.string().optional(),
  publicId: z.string().optional(),
  userId: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const UpdateUserData = () => {
  const { userId } = useAuth();
  const { data, isLoading, error, refetch } = useUserInfoQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const userProfileImg = data?.profileImg?.url || profileImage;
  

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      contactNo: "",
      imageUrl: "",
      publicId: "",
      userId: userId,
    },
  });

  // Use useEffect to update form values once data is fetched
  useEffect(() => {
    if (data) {
      form.reset({
        fullName: data.userName,
        email: data.email,
        contactNo: data.contactNo,
        imageUrl: data.profileImg?.url || "",
        publicId: data.profileImg?.publicId || "",
      });
    }
  }, [data, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      let imageUrl = data.imageUrl;
      let publicId = data.publicId;

      if (selectedFile) {
        const uploadResult = await uploadImage(selectedFile);
        if (!uploadResult?.url || !uploadResult?.publicId) {
          throw new Error("Failed to upload image");
        }
        imageUrl = uploadResult.url;
        publicId = uploadResult.publicId;
      }

      const formDataWithImageUrl: FormData = {
        fullName: data.fullName,
        email: data.email,
        contactNo: data.contactNo,
        userId: userId,
      };

      if (selectedFile) {
        formDataWithImageUrl.imageUrl = imageUrl;
        formDataWithImageUrl.publicId = publicId;
      }
      const res: any = await updateUser(formDataWithImageUrl);
      console.log("res is ", res);
      if (res.error?.data) {
        if (res.error.data.message) {
          form.setError("root", {
            message: res.error.data.message,
          });
        } else {
          form.setError("root", {
            message: res.error.data,
          });
        }
      } else {
        refetch();
        toast({
          description: "Profile updated successfully.",
        });
        console.log("Updated successfully");
      }
    } catch (error) {
      console.log("error of reg catch", error);
      form.setError("root", {
        message: "Registration failed! try again",
      });
    }
  };
  if(error){
    console.log('error for error comp',error)
  }
  if (isLoading) return <ProgressDemo isLoading={isLoading} />;
  if (error) return <ErrorComponent message={error.data.message} />;
  return (
    <div className="w-3/4 m-auto">
      <MyCard title="" description="" footer="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {form.formState.errors.root && (
              <FormItem>
                <FormLabel className="text-destructive">
                  {form.formState.errors.root.message}
                </FormLabel>
              </FormItem>
            )}
            <FormField
              control={form.control}
              name="fullName" // Add field for name
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Full Name" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.fullName?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <div className="flex gap-16">
              <img
                src={userProfileImg}
                className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full"
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={() => (
                  <FormItem>
                    <FormLabel>Choose Another Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </FormControl>

                    <FormMessage>
                      {form.formState.errors.imageUrl?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="contactNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.contactNo?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              variant={"bg1"}
            >
              {form.formState.isSubmitting ? "Loading..." : "Update"}
            </Button>
          </form>
        </Form>
      </MyCard>
    </div>
  );
};

export default UpdateUserData;
