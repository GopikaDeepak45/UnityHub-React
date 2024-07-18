import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '../components/ui/Form';
import MyCard from '@/components/MyCard';
import { z } from 'zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import ErrorComponent from './ErrorComponent';
import { useAddBuildingServiceMutation } from '@/redux/apiSlices/commAdminApiSlice';
import useAuth from '@/hooks/useAuth';

// Define form schema using Zod for validation
export const formSchema = z.object({
  communityAdminId:z.string().optional(),
  name: z.string().trim().min(1, { message: 'Name cannot be empty' }).max(50, { message: 'Name must be at most 50 characters.' }).refine(value => !!value, { message: 'Name cannot be empty.' }),
  description: z.string().trim().min(1, { message: 'Description cannot be empty' }).max(100, { message: 'Description must be at most 100 characters.' }).refine(value => !!value, { message: 'Description cannot be empty.' }),
  servicesPerHour: z.string().trim().refine(value => /^[0-9]+$/.test(value), { message: "enter valid Service Hour  ." })
});
type FormData = z.infer<typeof formSchema>;

const AddBuildingService = ({ refetch }: { refetch: () => void }) => {
  const{userId}=useAuth()
  const [showAddModal, setShowAddModal] = useState(false);
  const [addBuildingService] = useAddBuildingServiceMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      communityAdminId:userId,
      name: '',
      description: '',
      servicesPerHour:""
    },
  });

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

 

  const onSubmit = async (values: FormData) => {
    console.log('vals',values)
    try {
      
      const formDataWithCommunityData: FormData = {
        ...values,
       communityAdminId:userId,
       
       
      };

      const res = await addBuildingService(formDataWithCommunityData);

      if (res.error?.data) {
        if (res.error.data.message) {
          form.setError('root', {
            message: res.error.data.message,
          });
        } else {
          form.setError('root', {
            message: res.error.data,
          });
        }
      } else {
        refetch();
        setShowAddModal(false);
        form.reset();
      }
    } catch (error) {
      return <ErrorComponent />;
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={handleShowAddModal}>Add New  Service</AlertDialogTrigger>
      {showAddModal && (
        <AlertDialogContent>
          <MyCard title="" description="" footer="">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {form.formState.errors.root && (
                  <FormItem>
                    <FormLabel className="text-destructive">{form.formState.errors.root.message}</FormLabel>
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
                <FormField
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
                />

                <div className="flex justify-around">
                  {!form.formState.isSubmitting && <AlertDialogCancel>Cancel</AlertDialogCancel>}
                  <Button type="submit" disabled={form.formState.isSubmitting} variant={'bg1'}>
                    {form.formState.isSubmitting ? 'Loading...' : 'Submit'}
                  </Button>
                </div>
              </form>
            </Form>
          </MyCard>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
};

export default AddBuildingService;
