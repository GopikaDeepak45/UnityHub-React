import { SetStateAction,useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import pic1 from "../../assets/pic1.png";
import { Input } from "@/components/ui/input";
import { useGetLandingPageQuery } from "@/redux/apiSlices/landingPageSlice";
import EditCorePackage from '@/components/EditCorePackage';
import AddCorePackage from '@/components/AddCorePackage';
import CustomAlertButton from '@/components/CustomAlert';
import { Button } from '@/components/ui/button';
import { useDeleteCorePackageMutation } from '@/redux/apiSlices/adminApiSlice';
import PaginationComponent from '@/components/PaginationComponent';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import ProgressDemo from '@/components/ProgressDemo';
import ErrorComponent from '@/components/ErrorComponent';

const CorePackages = () => {

  const { data: landingPageData, error, isLoading, refetch } = useGetLandingPageQuery(undefined);
  const [deletePackage] = useDeleteCorePackageMutation()
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [showEditModal, setShowEditModal] = useState(false);

  const deleteImageHandler = async (id: string) => {

    try {
      await deletePackage({ id })

      refetch()


    } catch (e) {

    }
  }
  //to manage modal display
  const handleShowAddModal = () => {
    setShowEditModal(true);
  };
  if (isLoading) return  <ProgressDemo isLoading={isLoading} />;
  if (error) return <ErrorComponent message={error.data.message}/>
  if (!landingPageData) return <div className="flex justify-center text-4xl mt-10">No data available...</div>

  const filteredPackages = landingPageData.corePackage.filter((item: { name: string; shortDescription: string }) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let paginatedPackages
  if (filteredPackages.length > itemsPerPage) {
    paginatedPackages = filteredPackages.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  } else {
    paginatedPackages = filteredPackages
  }

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };
  return (
    <div className="ml-10">
      <h1 className="text-2xl font-semibold m-10">Core Packages</h1>
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

            <AddCorePackage refetch={refetch} />
          </div>
        </div>
      </div>
      <Table >

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl NO:</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedPackages.map((item: { _id: string; name: string; image: { url: string; publicId: string }; shortDescription: string }, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.shortDescription}</TableCell>
              <TableCell>
                <img src={item.image.url || pic1} alt={item.name} className="w-[200px] mx-auto" />
              </TableCell>
              <TableCell >
                <AlertDialog>
                  <AlertDialogTrigger onClick={handleShowAddModal}><div className="bg-green-500 p-2 px-4 rounded-md text-black ml-2 hover:bg-green-700">
                    Edit
                  </div>
                  </AlertDialogTrigger>
                  {showEditModal && (
                    <EditCorePackage refetch={refetch} packageData={item} setShowEditModal={setShowEditModal} />
                  )}
                </AlertDialog>
                <CustomAlertButton
                  title="Are you absolutely sure?"
                  description="This action cannot be undone. This will permanently delete the core package."
                  cancelText="Cancel"
                  confirmText="Continue"
                  onConfirm={() => deleteImageHandler(item._id)}
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
      {filteredPackages.length > itemsPerPage && (
        <PaginationComponent totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />

      )}

    </div>
  );
};

export default CorePackages;
