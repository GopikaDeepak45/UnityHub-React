
import { useEffect} from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import img from '../../assets/pic1.png'
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
import { error } from "console";

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


const UserLogin:React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
      role:'user',
    },
  });
  const [login] = useLoginMutation();
   const {role}=useAuth()

   useEffect(() => {
    if (role==='user') {
      
       navigate("/user");
     }
  }, []);

  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res:any = await login({  email:values.email, password:values.password,role:'user'}).unwrap()
      
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
            
      navigate("/user");
      }
    } catch (error:any) {
      console.log('errorrr',error)
      form.setError("root", {
        message: "Incorrect email or password",
      });
    }
  };


  return (
    
    <div className="md:min-h-[600px]  md:max-w-[600px] flex items-center justify-center bg-cover bg-center mx-auto rounded-3xl  shadow-2xl" style={{ backgroundImage: `url(${img})` }}>

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

export default UserLogin





// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// "use client";
// import img from '../../assets/pic1.png'
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../../components/ui/Form";
// import { Input } from "../../components/ui/input";
// import MyCard from "../../components/MyCard";
// import { setCredentials } from '@/redux/slices/authSlice';
// import { useLoginMutation } from "@/redux/apiSlices/authApiSlice";
// import useAuth from "@/hooks/useAuth";

// const formSchema = z.object({
//   email: z.string().email(),
//   password: z
//     .string()
//     .min(8, {
//       message: "Password must be at least 8 characters.",
//     })
//     .refine(
//       (value) => {
//         // Regular expression to match at least one digit, one special character,
//         // and one uppercase letter.
//         const passwordRegex =
//           /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
//         return passwordRegex.test(value);
//       },
//       {
//         message:
//           "Password must include at least one digit, one special character,and one uppercase letter.",
//       }
//     ),
//   role: z.string(),
// });

// const UserLogin: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       role: 'commAdmin',
//     },
//   });
//   const [login] = useLoginMutation();
//   const { role } = useAuth();

//   useEffect(() => {
//     if (role === 'user') {
//       navigate("/user");
//     }
//   }, [role, navigate]);

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const res: any = await login({ email: values.email, password: values.password, role: 'user' }).unwrap();

//       if (res.error?.message) {
//         form.setError("root", {
//           message: res.error.message
//         });
//       } else if (res.error?.data) {
//         if (res.error.data.message) {
//           console.log(res.error.data.message)
//           form.setError("root", {
//             message: res.error.data.message
//           });
//         } else {
//           form.setError("root", {
//             message: res.error.data
//           });
//         }
//       } else {
//         const { accessToken } = res;
//         dispatch(setCredentials({ accessToken }));
//         navigate("/user");
//       }
//     } catch (error: any) {
//       console.log('error', error);
//       form.setError("root", {
//         message: "Incorrect email or password",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}>
//       <div className="bg-white/75 p-8 rounded-lg shadow-lg max-w-md w-full">
//         <MyCard title="Login" description="" footer="">
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               {form.formState.errors.root && (
//                 <FormItem>
//                   <FormLabel className="text-red-600">
//                     {form.formState.errors.root.message}
//                   </FormLabel>
//                 </FormItem>
//               )}
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input placeholder="example@email.com" {...field} />
//                     </FormControl>
//                     <FormDescription></FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input type="password" placeholder="********" {...field} />
//                     </FormControl>
//                     <FormDescription></FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 type="submit"
//                 disabled={form.formState.isSubmitting}
//                 className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 {form.formState.isSubmitting ? "Loading..." : "Submit"}
//               </Button>
//             </form>
//           </Form>
//         </MyCard>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;
