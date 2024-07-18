// import React  from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import useAuth from '@/hooks/useAuth';
// import { useGetUserServicesQuery } from '@/redux/apiSlices/userServicesApiSlice';
// import { Spinner } from './Spinner';
// import ErrorComponent from './ErrorComponent';

// const MyServices: React.FC = () => {
//   const { userId } = useAuth()
//   const { data: services, error, isLoading } = useGetUserServicesQuery(userId);

//   if (isLoading) {
//     return <Spinner />;
//   }

//   if (error) {
//     <ErrorComponent message={error.data.message}/>
//   }

//   return (
//     <div className="container mx-auto p-4">
     
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {services?.map((service: { _id: React.Key | null | undefined; serviceName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; details: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
//           <Card key={service._id} className="shadow-lg">
//             <CardHeader>
//               <CardTitle className='mx-auto'>{service.serviceName}</CardTitle>
//               <CardDescription>{service.category}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p>{service.details}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyServices;

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Pencil } from 'lucide-react';
// import useAuth from '@/hooks/useAuth';
// import { useGetUserServicesQuery,  } from '@/redux/apiSlices/userServicesApiSlice';
// import { Spinner } from './Spinner';
// import ErrorComponent from './ErrorComponent';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/Form';

// const formSchema = z.object({
//   serviceName: z.string().min(1, { message: 'Service name is required' }),
//   details: z.string().min(1, { message: 'Details are required' }),
//   category: z.string().min(1, { message: 'Category is required' }),
// });

// type FormData = z.infer<typeof formSchema>;

// const MyServices: React.FC = () => {
//   const { userId } = useAuth();
//   const { data: services, error, isLoading } = useGetUserServicesQuery(userId);
//   // const [updateUserService] = useUpdateUserServiceMutation();
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [currentService, setCurrentService] = useState<any>(null);

//   const form = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       serviceName: '',
//       details: '',      
//     },
//   });

//   const handleEdit = (service: any) => {
//     setCurrentService(service);
//     form.reset(service);
//     setIsEditDialogOpen(true);
//   };

//   const onSubmit = async (data: FormData) => {
//     try {
//       // await updateUserService({ ...data, id: currentService._id });
//       setIsEditDialogOpen(false);
//     } catch (e) {
//       console.error('Error updating service:', e);
//     }
//   };

//   if (isLoading) {
//     return <Spinner />;
//   }

//   if (error) {
//     return <ErrorComponent message={error.data.message} />;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {services?.map((service: any) => (
//           <Card key={service._id} className="shadow-lg relative">
//             <CardHeader>
//               <CardTitle className="mx-auto">{service.serviceName}</CardTitle>
//               <CardDescription>{service.category}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <p>{service.details}</p>
//             </CardContent>
//             <Button
//               variant="ghost"
//               className="absolute top-2 right-2"
//               onClick={() => handleEdit(service)}
//             >
//               <Pencil className="w-4 h-4" />
//             </Button>
//           </Card>
//         ))}
//       </div>

//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Service</DialogTitle>
//           </DialogHeader>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)}>
//               <FormField
//                 control={form.control}
//                 name="serviceName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Service Name</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage>
//                       {form.formState.errors.serviceName?.message}
//                     </FormMessage>
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="details"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Details</FormLabel>
//                     <FormControl>
//                       <Input {...field} />
//                     </FormControl>
//                     <FormMessage>
//                       {form.formState.errors.details?.message}
//                     </FormMessage>
//                   </FormItem>
//                 )}
//               />
              
//               <Button type="submit" className="mt-4">
//                 Update Service
//               </Button>
//             </form>
//           </Form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default MyServices;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, X } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import {  useDeleteUserServiceMutation, useEditUserServiceMutation, useGetUserServicesQuery } from '@/redux/apiSlices/userServicesApiSlice';
import { Spinner } from './Spinner';
import ErrorComponent from './ErrorComponent';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/Form';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  serviceName: z.string().min(1, { message: 'Service name is required' }),
  details: z.string().min(1, { message: 'Details are required' }),
  
});

type FormData = z.infer<typeof formSchema>;

const MyServices: React.FC = () => {
  const { userId } = useAuth();
  const { data: services, error, isLoading,refetch } = useGetUserServicesQuery(userId);
  const[deleteUserService]=useDeleteUserServiceMutation()
 const [editUserService] = useEditUserServiceMutation();
  const [currentService, setCurrentService] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: '',
      details: '',
    },
  });

  const handleEdit = (service: any) => {
    setCurrentService(service);
    form.reset(service);
    setIsEditing(true);
  };
  const handleClose = () => {
    setIsEditing(false);
    setCurrentService(null);
  };
const deleteHandler=async()=>{
try{
await deleteUserService(currentService._id)
refetch()
}catch(e:any){
  <ErrorComponent message={e.data.message}/>
}
}

  const onSubmit = async (data: FormData) => {
    
    try {
      await editUserService({ ...data, id: currentService._id });
      setIsEditing(false);
      refetch()
    } catch (e) {
      console.error('Error updating service:', e);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorComponent message={error.data.message} />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services?.map((service: any) => (
          <div key={service._id} className="card-container shadow-lg relative">
            {isEditing && currentService?._id === service._id ? (
              <div className="edit-mode p-10">
                <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                      <div/>
                      <Button variant="ghost" onClick={handleClose}>
                        <X className="w-6 h-6" />
                      </Button>
                    </div>
                  <FormField
                    control={form.control}
                    name="serviceName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.details?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <div className='flex justify-around my-4'>

                  
                  <Button type="submit" className='bg-green-500 hover:bg-green-700'>
                    Update 
                  </Button>
                  <Button className='bg-red-400 hover:bg-red-700' onClick={deleteHandler}>Delete</Button>
                  </div>
                  </form>
                </Form>
              </div>
            ) : (
              <Card className="card-content">
                <CardHeader>
                  <CardTitle className="mx-auto">{service.serviceName}</CardTitle>
                  <CardDescription>{service.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{service.details}</p>
                  <p>
                    Status: 
                    {service.isApproved === false && (<div className="status-box bg-yellow-100 border border-yellow-400 text-yellow-700 p-2 mt-2">
                      Waiting for admin approval
                    </div>)}
                    {service.isRejected===true && (
                    <div className="status-box bg-red-100 border border-red-400 text-red-700 p-2 mt-2">
                      Rejected: {service.rejectionReason}
                    </div>
                  )}
                  </p>
                </CardContent>
                <Button
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => handleEdit(service)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyServices;
