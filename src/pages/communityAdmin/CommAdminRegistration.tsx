import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
("use client");
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {  z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/Form";
import { Input } from "../../components/ui/input";
import MyCard from "../../components/MyCard";
import useAuth from "@/hooks/useAuth";
import { useRegisterMutation } from "@/redux/apiSlices/commAdminApiSlice";
import OtpComponent from "@/components/OtpComponent";
const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Name cannot be empty" }).max(50, { message: "Name must be at most 50 characters." }).refine(value => !!value, { message: "Name cannot be empty." }),
  email: z.string().email(),
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
    ),
  mobileNo: z.string().trim().min(1, { message: " Cannot be empty" }).max(10, { message: "Mobile number must be a 10-digit number." }).length(10, { message: "Mobile number must be exactly 10 digits." }).refine(value => /^[0-9]+$/.test(value), { message: "Mobile number must contain only digits." }),
  communityName: z.string().trim().min(1, { message: "Community Name cannot be empty" }).max(50, { message: "Community name must be at most 50 characters." }).refine(value => !!value, { message: "Community name cannot be empty." }),
  communityLocation: z.string().trim().min(1, { message: "Community location cannot be empty" }).max(50, { message: "Community location must be at most 50 characters." }).refine(value => !!value, { message: "Community location cannot be empty." }),
});



const CommAdminRegistration: React.FC = () => {
  const [register] = useRegisterMutation()
  const { username } = useAuth()
  const [otpPageVisible, setOtpPageVisible] = useState(false);
  const [commAdminId, setCommAdminId] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobileNo: "",
      communityName: "",
      communityLocation: "",
    },
  });


  useEffect(() => {
    if (username) {
     navigate('/commadamin')
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      const res: any = await register(values)
      console.log('res from backend', res)

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
        setCommAdminId(res.data.admin_id);
        setOtpPageVisible(true)
      }
    } catch (error) {
      console.log('error of reg catch',error)
      form.setError("root", {
        message: "Registration failed! try again"
      });
    }
  };

  return (
    <div className="w-1/3 mx-auto ">
     {otpPageVisible&&commAdminId ? (
      // Render the OTP page
      <OtpComponent  id={commAdminId} role='comm-admin' />
    ) : (
      <MyCard title="Community  Registration" description="" footer="">
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
            name="name" // Add field for name
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
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
            name="mobileNo"
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
            name="communityLocation"
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
  );
};
export default CommAdminRegistration;
