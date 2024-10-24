
import { useEffect} from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
"use client";
import img from '../../assets/pic1.png'
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


const CommAdminLogin:React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
      role:'commAdmin',
    },
  });
  const [login] = useLoginMutation();
   const {role}=useAuth()

   useEffect(() => {
    if (role==='commAdmin') {
      
       navigate("/comm-admin");
     }
  }, []);

  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res:any = await login({  email:values.email, password:values.password,role:'commAdmin'}).unwrap()
      
      if (res.error?.message) {
        form.setError("root", {
          message: res.error.message
        });
      }
      
     else if (res.error?.data) {
        
        if (res.error.data.message) {
          console.log(res.error.data.message)
          form.setError("root", {
            message: res.error.data.message
          });
          
        }else{
          form.setError("root", {
            message: res.error.data
          });
      }
      }else{
      
      const{accessToken}=res
      dispatch(setCredentials({ accessToken }))
            
      navigate("/comm-admin");
      }
    } catch (e) {
      console.log('errorrr',e)
      form.setError("root", {
        message: "Incorrect email or password",
      });
    }
  };


  return (
    <div className="md:min-h-[600px]  md:max-w-[600px] flex items-center justify-center bg-cover bg-center mx-auto" style={{ backgroundImage: `url(${img})` }}>

       <MyCard title="Login" description="" footer="">
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

export default CommAdminLogin