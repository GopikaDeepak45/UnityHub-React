// AdminServices.tsx
import React, { SetStateAction, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import useAuth from '@/hooks/useAuth';
import ProgressDemo from '@/components/ProgressDemo';
import ErrorComponent from '@/components/ErrorComponent';
import PaginationComponent from '@/components/PaginationComponent';
import { useGetAllUserServicesAdminQuery } from '@/redux/apiSlices/userServicesApiSlice';
import ApproveUserService from '@/components/ApproveUserService';
import RejectUserService from '@/components/RejectUserService';

const userServicesList: React.FC = () => {
  const { userId: commAdminId } = useAuth();
  const { data: services, error, isLoading, refetch } = useGetAllUserServicesAdminQuery(commAdminId);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const[showApproveModal,setShowApproveModal]=useState(false)
  const[showRejectModal,setShowRejectModal]=useState(false)
console.log('services',services)
  if (isLoading) return <ProgressDemo isLoading={isLoading} />;
  if (error) return <ErrorComponent message={error.data.message} />;
  if (services.length === 0)
    return (
      <>
        <div className="flex justify-center text-4xl mt-10">
          No Services data available...
        </div>
      </>
    );
    const handleShowApproveModal = () => {
        setShowApproveModal(true);
      };
      const handleShowRejectModal = () => {
        setShowRejectModal(true);
      };
  const filteredServices = services.filter((service: any) =>
    service.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let paginatedServices;

  if (filteredServices.length > itemsPerPage) {
    paginatedServices = filteredServices.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  } else {
    paginatedServices = filteredServices;
  }

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };

  return (
    <div className="ml-10">
      <h1 className="text-2xl font-semibold m-10">User Services</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl. No.</TableHead>
            <TableHead>Service Name</TableHead>
            <TableHead>Provider Name</TableHead>
            <TableHead>Block</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedServices.map((service: any, index: number) => (
            <TableRow key={service._id}>
              <TableCell className="font-medium">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell>{service.serviceName}</TableCell>
              <TableCell>{service.providerId.userName}</TableCell>
              <TableCell className='capitalize'>{service.providerId.block}</TableCell>
              <TableCell>{service.category}</TableCell>
              <TableCell>
                {service.isApproved==false ? (
                  <span className=" text-yellow-800 py-1 px-2  ">
                    Waiting for Approval
                  </span>
                ) : service.isRejected === true ? (
                  <span className="bg-red-200 text-red-800 py-1 px-2 rounded-full text-xs">
                    Rejected: {service.rejectionReason}
                  </span>
                ) : (
                  <span className="bg-green-200 text-green-800 py-1 px-2 rounded-full text-xs">
                    Approved
                  </span>
                )}
              </TableCell>
              <TableCell>
              {service.isApproved==false&& (
                  <AlertDialog>
                    <AlertDialogTrigger onClick={handleShowApproveModal} className=" mb-3 rounded-md bg-green-300 p-2 text-black ml-2 hover:bg-green-500">
                      Approve
                    </AlertDialogTrigger>
                    {showApproveModal&&(
                        <ApproveUserService service={service} serviceId={service._id} refetch={refetch} setShowApproveModal={setShowApproveModal} />
                    )}
                    
                  </AlertDialog>
              )}
             
                
                  <AlertDialog>
                    <AlertDialogTrigger onClick={handleShowRejectModal} className="rounded-md bg-red-500 p-2 px-4 text-black ml-2 hover:bg-red-700">
                      Reject
                    </AlertDialogTrigger>
                    {showRejectModal&&(
                        <RejectUserService setShowRejectModal={setShowRejectModal} serviceId={service._id} refetch={refetch} />
                    )}
                    
                  </AlertDialog>
                  {service.isApproved==true&&service.isRejected==true&& (
                  <AlertDialog>
                    <AlertDialogTrigger onClick={handleShowApproveModal} className=" mb-3 rounded-md bg-green-300 p-2 text-black ml-2 hover:bg-green-500">
                      Approve
                    </AlertDialogTrigger>
                    {showApproveModal&&(
                        <ApproveUserService service={service} serviceId={service._id} refetch={refetch} setShowApproveModal={setShowApproveModal} />
                    )}
                    
                  </AlertDialog>
              )}
                  
         
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredServices.length > itemsPerPage && (
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default userServicesList;
