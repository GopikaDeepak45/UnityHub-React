
// import { z } from "zod"
// import MyCard from "./MyCard"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/Form"
// import { AlertDialogContent } from "./ui/alert-dialog"
// import { Button } from "./ui/button"
// import { Input } from "./ui/input"
// import { useAddImageMutation } from "@/redux/apiSlices/adminApiSlice"

// const formSchema = z.object({
//     imageType: z.enum(['hero', 'about', 'common']), // Define image type schema
//     imageUrl: z.string(), // Validate that imageUrl is a valid URL
//     publicId:z.string()
//   });
  
//   // Define FormData type with all form fields
//   type FormData = z.infer<typeof formSchema>;

// const AddAdminImages = () => {
//     const [addImage] = useAddImageMutation()
//   return (
//     <AlertDialogContent>
//             <MyCard title="Login" description="" footer="">
//               <Form {...form}>
//                 <form
//                   onSubmit={form.handleSubmit(onSubmit)}
//                   className="space-y-8"

//                 >
//                   {form.formState.errors.root && (
//                     <FormItem>
//                       <FormLabel className="text-destructive">
//                         Error adding new image
//                       </FormLabel>
//                     </FormItem>
//                   )}
//                   <FormField
//                     control={form.control}
//                     name="imageType"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Image Type</FormLabel>
//                         <FormControl>
//                           <select
//                             {...field}
//                             value={field.value}
//                             className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

//                           >
//                             <option value="hero" >Hero Image</option>
//                             <option value="about">About Image</option>
//                             <option value="common">
//                               Common Images
//                             </option>
//                           </select>
//                         </FormControl>
//                         <FormDescription></FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="imageUrl"
//                     render={() => (
//                       <FormItem>
//                         <FormLabel>Image URL</FormLabel>
//                         <FormControl>
//                           <Input type="file" onChange={handleFileChange} accept="image/*" />
//                         </FormControl>

//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <div className="flex justify-around">
//                     {!form.formState.isSubmitting&&(
//                        <AlertDialogCancel>Cancel</AlertDialogCancel>
//                     )}
                   

//                     <Button
//                       type="submit"
//                       disabled={form.formState.isSubmitting}
//                       variant={"bg1"}
//                     >
//                       {form.formState.isSubmitting?
//                       //   ?<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                        
//                       // </svg>
//                       "Loading..." : "Submit"}
//                     </Button>
//                   </div>
//                 </form>
//               </Form>
//             </MyCard>
//           </AlertDialogContent>
//   )
// }

// export default AddAdminImages