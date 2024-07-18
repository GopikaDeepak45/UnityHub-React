
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProgressDemo from '@/components/ProgressDemo';
import { useApproveNewUserServiceMutation, useGetAllUserServiceCategoriesQuery } from '@/redux/apiSlices/userServicesApiSlice';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface IProps {
  serviceId: string;
  service: any;
  refetch: () => void;
  setShowApproveModal: (show: boolean) => void;
}

const ApproveUserService = ({ serviceId, service, refetch, setShowApproveModal }: IProps) => {
  const { userId } = useAuth();
  const { data, isLoading: categoriesLoading } = useGetAllUserServiceCategoriesQuery(userId);
  const [approveUserService, { isLoading: approving }] = useApproveNewUserServiceMutation();
  const categories = data?.categories || [];
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const navigate=useNavigate()
 

  // const onSubmit = async (data: any) => {
  //   const category = data.newCategory || selectedCategory;
  //   await approveUserService({ serviceId, category });
  //   setShowApproveModal(false);
  //   refetch();
  // };

  const onSubmit = async (data: any) => {
    if (!selectedCategory && !newCategory) {
      setErrorMessage('Please select or add a category before submitting.');
      return;
    }

    setErrorMessage('');
    const category = data.newCategory || selectedCategory;
    await approveUserService({ serviceId, category });
    setShowApproveModal(false);
    refetch();
    navigate('/comm-admin/user-services')
  };

  if (categoriesLoading || approving) return <ProgressDemo isLoading={categoriesLoading || approving} />;

  return (
    <AlertDialogContent className='p-20'>
      <AlertDialogHeader>
        <h2 className="text-xl mb-4">{`${service.providerId.userName}`}<span className='ml-5 capitalize'>{` Block -  ${service.providerId.block}`}</span></h2>
      </AlertDialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}> 
        <p className='mb-5'><span className='text-xl font-extrabold'>{`${service.serviceName}`}</span> :{ `${service.details}`}</p>
        <div className="mb-4">
          <label className="block mb-2">Select or Add a Category:</label>
          <div>
            {categories.map((cat: string, index: number) => (
              <label key={index} className="block mb-2">
                <input
                  type="radio"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={() => {
                    setSelectedCategory(cat);
                    setNewCategory('');
                  }}
                  disabled={!!newCategory}
                />
                <span className="ml-2">{cat}</span>
              </label>
            ))}
            <label className="block mb-2">
              <input className='invisible'
                type="radio"
                value=""
                checked={!selectedCategory && !!newCategory}
                onChange={() => setSelectedCategory('')}
              />
             <div className='mt-3'><span className="ml-2">Add New Category:</span></div> 
            </label>
            <Input
              type="text"
              {...register('newCategory')}
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value);
                setSelectedCategory('');
              }}
              disabled={!!selectedCategory}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
{errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <AlertDialogFooter>
          <Button variant="ghost" onClick={() => setShowApproveModal(false)}>
            Cancel
          </Button>
          <Button variant="default" type="submit" className="ml-2">
            Approve
          </Button>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  );
}

export default ApproveUserService;

// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import ProgressDemo from '@/components/ProgressDemo';
// import { useApproveNewUserServiceMutation, useGetAllUserServiceCategoriesQuery } from '@/redux/apiSlices/userServicesApiSlice';
// import useAuth from '@/hooks/useAuth';

// interface IProps {
//   serviceId: string;
//   service: any;
//   refetch: () => void;
//   setShowApproveModal: (show: boolean) => void;
// }

// const ApproveUserService = ({ serviceId, service, refetch, setShowApproveModal }: IProps) => {
//   const { userId } = useAuth();
//   const { data, isLoading: categoriesLoading } = useGetAllUserServiceCategoriesQuery(userId);
//   const [approveUserService, { isLoading: approving }] = useApproveNewUserServiceMutation();
//   const categories = data?.categories || [];
//   const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [newCategory, setNewCategory] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const onSubmit = async (data: any) => {
//     if (!selectedCategory && !newCategory) {
//       setErrorMessage('Please select or add a category before submitting.');
//       return;
//     }

//     setErrorMessage('');
//     const category = newCategory || selectedCategory;
//     await approveUserService({ serviceId, category });
//     setShowApproveModal(false);
//     refetch();
//   };

//   if (categoriesLoading || approving) return <ProgressDemo isLoading={categoriesLoading || approving} />;

//   return (
//     <AlertDialogContent className='p-20'>
//       <AlertDialogHeader>
//         <h2 className="text-xl mb-4">{`${service.providerId.userName}`}<span className='ml-5 capitalize'>{` Block -  ${service.providerId.block}`}</span></h2>
//       </AlertDialogHeader>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <p className='mb-5'><span className='text-xl font-extrabold'>{`${service.serviceName}`}</span> :{ `${service.details}`}</p>
//         <div className="mb-4">
//           <label className="block mb-2">Select or Add a Category:</label>
//           <div>
//             {categories.map((cat: string, index: number) => (
//               <label key={index} className="block mb-2">
//                 <input
//                   type="radio"
//                   value={cat}
//                   checked={selectedCategory === cat}
//                   onChange={() => {
//                     setSelectedCategory(cat);
//                     setNewCategory('');
//                   }}
//                   disabled={!!newCategory}
//                 />
//                 <span className="ml-2">{cat}</span>
//               </label>
//             ))}
//             <label className="block mb-2">
//               <input
//                 type="radio"
//                 value=""
//                 checked={!selectedCategory && !!newCategory}
//                 onChange={() => setSelectedCategory('')}
//               />
//               <div className='mt-3'><span className="ml-2">Add New Category:</span></div>
//             </label>
//             <Input
//               type="text"
//               {...register('newCategory')}
//               value={newCategory}
//               onChange={(e) => {
//                 setNewCategory(e.target.value);
//                 setSelectedCategory('');
//               }}
//               disabled={!!selectedCategory}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>
//         {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
//         <AlertDialogFooter>
//           <Button variant="ghost" onClick={() => setShowApproveModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="default" type="submit" className="ml-2">
//             Approve
//           </Button>
//         </AlertDialogFooter>
//       </form>
//     </AlertDialogContent>
//   );
// }

// export default ApproveUserService;

