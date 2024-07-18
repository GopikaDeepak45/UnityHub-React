import AddBuildingService from '@/components/AddBuildingService'
import CustomAlertButton from '@/components/CustomAlert';
import EditBuildingService from '@/components/EditBuildingServices';
import EditCorePackage from '@/components/EditCorePackage';
import ErrorComponent from '@/components/ErrorComponent';
import Overlay from '@/components/OverLay';
import PaginationComponent from '@/components/PaginationComponent';
import ProgressDemo from '@/components/ProgressDemo';
import ServiceScheduleList from '@/components/ServiceScheduleList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useAuth from '@/hooks/useAuth';
import { useDeleteBuildingServiceMutation, useGetBuildingServicesDataQuery } from '@/redux/apiSlices/commAdminApiSlice';
import { AlertDialog, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { SetStateAction, useState } from 'react';
interface ISchedules {
  scheduledTime: number;
  scheduledBy: {userName:string; block:string; flatNo:number}; 
  scheduledDate: Date; 
}

interface IService {
  service: {
    name: string;
    description: string;
    scheduledTimes: ISchedules[];
  };
}

const BuildingServices = () => {
  const{userId}=useAuth()
  const { data, error, isLoading, refetch } = useGetBuildingServicesDataQuery(userId);
  console.log('dataaaa',data)
  const[deleteBuildingService]=useDeleteBuildingServiceMutation()
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [showEditModal, setShowEditModal] = useState(false);
  const[showSchedules,setShowSchedules]=useState(false)

  //to manage modal display
  const handleShowAddModal = () => {
    setShowEditModal(true);
  };
  //delete service
  const deleteServiceHandler=async(id:string)=>{
    try{
await deleteBuildingService({id,communityAdminId:userId})
refetch()
    }catch(e){
      console.log('error',e)
    }
  }
  if (isLoading) return  <ProgressDemo isLoading={isLoading} />;
  if (error) return <ErrorComponent message={error.data.message}/>
  if (data.length==0) return(<> <div className="flex justify-center text-4xl mt-10">No data available...</div>
  <Button><AddBuildingService refetch={refetch}/></Button></>)
  
  const filteredServices = data.filter((item: { name: string; description: string }) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  let paginatedServices
  if (filteredServices.length > itemsPerPage) {
    paginatedServices = filteredServices.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  } else {
    paginatedServices = filteredServices
  }

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  
  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };
  return (
    <div className="ml-10">
      <h1 className="text-2xl font-semibold m-10">Building Services</h1>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            className="px-3 py-2 w-80"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <div className="border border-green-800  p-2 rounded-md min-w-36 max-w-48 text-center">

            <AddBuildingService refetch={refetch} />
          </div>
        </div>
      </div>
      <Table >

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl NO:</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Schedules</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedServices.map((item: { _id: string; name: string; description: string; maxServicesPerHour:number; scheduledTimes: ISchedules[]; }, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <Button className='bg-gray-400 text-black' onClick={()=>setShowSchedules(true)}>Open</Button>
                {/* <AlertDialog>
                  <AlertDialogTrigger onClick={()=>setShowSchedules(true)}><div className="bg-gray-500 p-2 px-4 rounded-md text-black ml-2 hover:bg-green-700">
                   Open
                  </div>
                  </AlertDialogTrigger>
                  {showSchedules&&(
                <ServiceScheduleList service={item} setShowSchedules={setShowSchedules}/>
              )}
                </AlertDialog> */}
                {showSchedules && (
        <Overlay onClose={()=>setShowSchedules(false)}>
          <ServiceScheduleList service={item} setShowSchedules={setShowSchedules} />
        </Overlay>
      )}
                </TableCell>
              
              <TableCell >
                <AlertDialog>
                  <AlertDialogTrigger onClick={handleShowAddModal}><div className="bg-green-500 p-2 px-4 rounded-md text-black ml-2 hover:bg-green-700">
                    Edit
                  </div>
                  </AlertDialogTrigger>
                  {showEditModal && (
                    <EditBuildingService refetch={refetch} serviceData={item} setShowEditModal={setShowEditModal} />
                  )}
                </AlertDialog>
                <CustomAlertButton
                  title="Are you absolutely sure?"
                  description="This action cannot be undone. This will permanently delete the core package."
                  cancelText="Cancel"
                  confirmText="Continue"
                  onConfirm={() => deleteServiceHandler(item._id)}
                >
                  <Button className="bg-red-300 p-2 text-black ml-2 hover:bg-red-500">
                    Delete
                  </Button>
                </CustomAlertButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredServices.length > itemsPerPage && (
        <PaginationComponent totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />

      )}

    </div>
  )
}

export default BuildingServices