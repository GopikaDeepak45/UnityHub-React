
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSendMessageMutation } from "@/redux/apiSlices/landingPageSlice";

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().nonempty("Message is required"),
});

const ContactUs = () => {
  const[sendMessage]=useSendMessageMutation()
  const {handleSubmit,register,formState: { errors, isSubmitting },} = useForm({resolver: zodResolver(formSchema),});

  const onSubmit =async (data: any) => {
    try{
      const res=await sendMessage(data)
      console.log('msg sent',res)

    }catch(e){

    }
    
  };

  return (
    <div id="contact" className="container mx-auto flex-1 py-10">
      
      <div className=" w-full md:w-1/2 p-10 ">
      <h4 className="text-center pb-10 text-3xl">Contact Us</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex gap-5">
            <div className="form-group">
              
              <Input
                id="name"
                {...register("name")}
                placeholder="Name"
                className="bg-customGreen"
              />
              {errors.name && <p className="error text-red-500">Enter your name</p>}
            </div>
            <div className="form-group">
             
              <Input
                id="email"
                {...register("email")}
                type="email"
                placeholder="Email"
                className="bg-customGreen"
              />
              {errors.email && <p className="error text-red-500">'Please enter a valid email</p>}
            </div>
          </div>
          <div className="form-group">
            
            <Input
              id="message"
              {...register("message")}
              placeholder="Message"
              className="bg-customGreen h-32 mt-5"
            />
            {errors.message && (
              <p className="error text-red-500">Enter the message</p>
            )}
          </div>
          <Button type="submit"  variant={"bg1"}>
            {isSubmitting ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
