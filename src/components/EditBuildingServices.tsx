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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/Form';
import useAuth from '@/hooks/useAuth';
import { useEditBuildingServiceMutation } from '@/redux/apiSlices/commAdminApiSlice';

// Define form schema using Zod for validation
export const formSchema = z.object({
    id:z.string().optional(),
    communityAdminId:z.string().optional(),
    name: z.string().trim().min(1, { message: 'Name cannot be empty' }).max(50, { message: 'Name must be at most 50 characters.' }).refine(value => !!value, { message: 'Name cannot be empty.' }),
    description: z.string().trim().min(1, { message: 'Description cannot be empty' }).max(100, { message: 'Description must be at most 100 characters.' }).refine(value => !!value, { message: 'Description cannot be empty.' }),
    servicesPerHour: z.string().trim().refine(value => /^[0-9]+$/.test(value), { message: "enter valid Service Hour  ." })
  });
  type FormData = z.infer<typeof formSchema>;


const EditBuildingService = ({ refetch, serviceData, setShowEditModal }: { refetch: () => void, setShowEditModal: (show: boolean) => void, serviceData: any }) => {
 
    const{userId}=useAuth()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        id:serviceData._id,
        communityAdminId:userId,
        name: serviceData.name,
        description: serviceData.description,
        servicesPerHour:serviceData.maxServicesPerHour
      },
  });

  const [editBuildingService] = useEditBuildingServiceMutation();
  
  const onSubmit = async (values: FormData) => {
    try {
      const res: any = await editBuildingService(values);

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
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                {/* <FormField
                  control={form.control}
                  name="servicesPerHour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Services Per hour</FormLabel>
                      <FormControl>
                        <Input {...field}  />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

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

export default EditBuildingService;
