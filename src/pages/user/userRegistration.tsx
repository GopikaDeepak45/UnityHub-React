import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegisterUserMutation } from "@/redux/apiSlices/userApiSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MyCard from "@/components/MyCard";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import OtpComponent from "@/components/OtpComponent";
import { useState } from "react";

const formSchema = z.object({
  fullName: z.string().trim().min(1, { message: "Name cannot be empty" }).max(50, { message: "Name must be at most 50 characters." }).refine(value => !!value, { message: "Name cannot be empty." }),
  email: z.string().email({ message: "Invalid email address" }),
  contactNo: z.string().trim().min(1, { message: "Cannot be empty" }).max(10, { message: "Mobile number must be a 10-digit number." }).length(10, { message: "Mobile number must be exactly 10 digits." }).refine(value => /^[0-9]+$/.test(value), { message: "Mobile number must contain only digits." }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .refine(
      (value) => {
        // Regular expression to match at least one digit, one special character,
        // and one uppercase letter.
        const passwordRegex =
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return passwordRegex.test(value);
      },
      {
        message:
          "Password must include at least one digit, one special character, and one uppercase letter.",
      }
    ),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .refine(
      (value) => {
        // Regular expression to match at least one digit, one special character,
        // and one uppercase letter.
        const passwordRegex =
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return passwordRegex.test(value);
      },
      {
        message:
          "Password must include at least one digit, one special character, and one uppercase letter.",
      }
    ),communityName: z.string().trim().min(1, { message: "Community name cannot be empty" }),
  location: z.string().trim().min(1, { message: "Location cannot be empty" }),
  block: z.string().trim().min(1, { message: "Block cannot be empty" }),
  flatNo: z.string().trim().min(1, { message: "Flat number cannot be empty" }).refine(value => /^[0-9]+$/.test(value), { message: "Flat no must contain only digits." }),
});

type FormData = z.infer<typeof formSchema>;

const UserRegistration = () => {
  const [registerUser] = useRegisterUserMutation();
  const [otpPageVisible, setOtpPageVisible] = useState(false);
  const[userId,setUserId]=useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNo: "",
      communityName: "",
     location: "",
     block:"",
     flatNo:""
    },
  });
  const onSubmit = async (data: FormData) => {
    try {
     const res:any= await registerUser(data);
     console.log('res is ',res)
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
        setUserId(res.data.userId)
        setOtpPageVisible(true)
      }
    }catch (error) {
        console.log('error of reg catch',error)
        form.setError("root", {
          message: "Registration failed! try again"
        });
      }
  };

  return (
    <div className="w-1/3 mx-auto ">
     {otpPageVisible&&userId ? (
      // Render the OTP page
      <OtpComponent  id={userId}  role='user'/>
    ) : (
      <MyCard title="User Registration" description="" footer="">
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
                <FormDescription></FormDescription>
                <FormMessage />
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
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="communityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Community Name</FormLabel>
                <FormControl>
                  <Input placeholder="Community Name" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Community Location</FormLabel>
                <FormControl>
                  <Input placeholder="Community Location" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="block"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Block</FormLabel>
                <FormControl>
                  <Input placeholder="Block" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="flatNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flat No</FormLabel>
                <FormControl>
                  <Input placeholder="Flat No" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            variant={"bg1"}
          >
            {form.formState.isSubmitting ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>

    </MyCard>
    )}
 
     
    </div>
    // <div className="flex justify-center items-center">
    //     <MyCard title="Register" description="" footer="">
    // <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
    //   {errors.root && <div className="text-destructive">{errors.root.message}</div>}
    //   <div>
    //     <label htmlFor="fullName">Full Name</label>
    //     <Input {...register("fullName")} placeholder="Full Name" />
    //     {errors.fullName && <div className="text-destructive">{errors.fullName.message}</div>}
    //   </div>
    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <Input {...register("email")} placeholder="Email" type="email" />
    //     {errors.email && <div className="text-destructive">{errors.email.message}</div>}
    //   </div>
    //   <div>
    //     <label htmlFor="contactNo">Contact Number</label>
    //     <Input {...register("contactNo")} placeholder="Contact Number" />
    //     {errors.contactNo && <div className="text-destructive">{errors.contactNo.message}</div>}
    //   </div>
    //   <div>
    //     <label htmlFor="password">Password</label>
    //     <Input {...register("password")} placeholder="Password" type="password" />
    //     {errors.password && <div className="text-destructive">{errors.password.message}</div>}
    //   </div>
    //   <div>
    //     <label htmlFor="communityName">Community Name</label>
    //     <Input {...register("communityName")} placeholder="Community Name" />
    //     {errors.communityName && <div className="text-destructive">{errors.communityName.message}</div>}
    //   </div>
    //   <div>
    //     <label htmlFor="location">Location</label>
    //     <Input {...register("location")} placeholder="Location" />
    //     {errors.location && <div className="text-destructive">{errors.location.message}</div>}
    //   </div>
    //   <div>
    //     <label htmlFor="flatNo">Flat Number</label>
    //     <Input {...register("flatNo")} placeholder="Flat Number" />
    //     {errors.flatNo && <div className="text-destructive">{errors.flatNo.message}</div>}
    //   </div>
    //   <Button type="submit">Register</Button>
    // </form>
    // </MyCard>
    // </div>
  );
};

export default UserRegistration;
