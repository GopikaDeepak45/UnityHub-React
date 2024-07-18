import useAuth from "@/hooks/useAuth"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MyCard from "./MyCard";
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "./ui/Form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useChangeUserPasswordMutation } from "@/redux/apiSlices/userApiSlice";
import { useToast } from "@/components/ui/use-toast"


const formSchema = z.object({
    oldPassword: z.string().min(8, { message: "Enter your current password." }), 
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }).refine((value) => {
          if (!value) return true;
          const passwordRegex =
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
          return passwordRegex.test(value);
        },
        {
          message:
            "Password must include at least one digit, one special character, and one uppercase letter.",
        }
      ).optional(),
    confirmPassword: z.string()
  }).refine(
    (data) => {
      if (data.newPassword) {
        return data.oldPassword && data.newPassword && data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords must match ",
      path: ["confirmPassword"],
    }
  );
  
  type FormData = z.infer<typeof formSchema>;

const UpdateUserPassword = () => {
    const {userId}=useAuth()
    const [changeUserPassword]=useChangeUserPasswordMutation()
    const { toast } = useToast()
  
    const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    });
  
   
  
  
    const onSubmit = async (data: FormData) => {
      try {
       const res:any= await changeUserPassword({...data,userId:userId});
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
          console.log('updataed successfully')
          toast({
            title:res.data.message,
            
          })
          form.reset()
        }
      }catch (error) {
          console.log('error of reg catch',error)
          form.setError("root", {
            message: "Registration failed! try again"
          });
        }
    };
  return (
    <div className="w-3/4 m-auto"><MyCard title="" description="" footer="">

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {form.formState.errors.root && (
          <FormItem>
            <FormLabel className="text-destructive">
              {form.formState.errors.root.message}
            </FormLabel>
          </FormItem>
        )}    <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.oldPassword?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.newPassword?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.confirmPassword?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
           
       
        
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          variant={"bg1"}
        >
          {form.formState.isSubmitting ? "Loading..." : "Update Password"}
        </Button>
      </form>
    </Form>
</MyCard>
  </div>
  )
}

export default UpdateUserPassword