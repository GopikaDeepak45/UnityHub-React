
import { useEffect} from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { setCredentials } from '@/redux/slices/authSlice';
import { useLoginMutation } from "@/redux/apiSlices/authApiSlice";
import useAuth from "@/hooks/useAuth";

const formSchema = z.object({
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
          "Password must include at least one digit, one special character,and one uppercase letter.",
      }
    ),
    role:z.string()
});


const AdminLogin:React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
      role:'admin',
    },
  });
  const [login] = useLoginMutation();
   const {role}=useAuth()

   useEffect(() => {
    if (role==='admin') {
      
       navigate("/admin");
     }
  }, []);

  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { accessToken } = await login({  email:values.email, password:values.password,role:'admin'}).unwrap()
            dispatch(setCredentials({ accessToken }))
            
      navigate("/admin");
    } catch (e) {
      form.setError("root", {
        message: "Incorrect email or password",
      });
    }
  };


  return (
    // <div className="flex justify-center items-center">
    <div className="md:min-h-[600px]  md:max-w-[600px] flex justify-center items-center bg-gradient-to-r mx-auto  from-green-200  from-purple-300-300 rounded-3xl border-4">
     
       <MyCard title="Login" description="" footer="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {form.formState.errors.root && (
            <FormItem>
              <FormLabel className="text-destructive">
                Incorrect email or password
              </FormLabel>
            </FormItem>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com " {...field} />
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
    </div>
  
  );
};

export default AdminLogin