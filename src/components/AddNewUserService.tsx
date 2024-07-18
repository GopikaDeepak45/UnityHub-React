import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/Form';
import useAuth from '@/hooks/useAuth';
import { useAddNewUserServiceMutation } from '@/redux/apiSlices/userServicesApiSlice';

// Define the validation schema using Zod
const formSchema = z.object({
  serviceName: z.string().min(1, { message: 'Service name is required' }),
  details: z.string().min(1, { message: 'Details are required' }),
});

type FormData = z.infer<typeof formSchema>;

const AddNewUserService: React.FC = () => {
  const { userId } = useAuth();
   const [addNewUserService] = useAddNewUserServiceMutation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: '',
      details: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const serviceData = {
        ...data,
        providerId: userId,
      };
       await addNewUserService(serviceData);
      form.reset();
    } catch (e) {
      console.error('Error adding service:', e);
    }
  };

  return (
    <div className="flex-grow">
      <Card className="max-w-md mx-auto">
        <CardHeader>
         
          
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="serviceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Service Name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.serviceName?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Details</FormLabel>
                    <FormControl>
                      <textarea
                        rows={6}
                        placeholder="Details"
                        {...field}
                        className="resize-none w-full p-2 border rounded-md"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.details?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <Button
                className="bg-blue-500 text-white mt-4"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Adding...' : 'Add Service'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewUserService;
