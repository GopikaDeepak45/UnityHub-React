"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import CustomAlertButton from "@/components/CustomAlert";
import { useDeleteCommunityImageMutation, useGetCommunityDataQuery } from "@/redux/apiSlices/commAdminApiSlice";
import useAuth from "@/hooks/useAuth";
import AddCommunityImages from "@/components/AddCommunityImages";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import ProgressDemo from "@/components/ProgressDemo";
import ErrorComponent from "@/components/ErrorComponent";

const CommunityImages = () => {
    const { userId: commAdminId } = useAuth();
    const { data, error, isLoading, refetch } = useGetCommunityDataQuery(commAdminId);
    const [showAddImageModal, setShowAddImageModal] = useState(false);

    const [deleteImage] = useDeleteCommunityImageMutation()
  
    const deleteImageHandler = async (imageType: string, imageUrl: string,publicId:string) => {
    try {
      await deleteImage({ imageType, imageUrl,publicId,commId:data._id })
     refetch()
    } catch (e) {

    }
  }
  const handleShowAddImageModal = () => {
    setShowAddImageModal(true);
  };
  if (isLoading) return  <ProgressDemo isLoading={isLoading} />;
  if (error) return <ErrorComponent message={error.data.message} />;

  if(!data.hero){
    return<>
    <div className="flex justify-center text-4xl">No Images available...
    </div>
    <div className="border border-green-800  p-2 rounded-md min-w-36 max-w-48 text-center">
    <AlertDialog >
          <AlertDialogTrigger onClick={handleShowAddImageModal}>Add New Image</AlertDialogTrigger>
          {showAddImageModal&&(
            <AddCommunityImages  refetch={refetch} setShowAddImageModal={setShowAddImageModal} commId={data._id}/>
            )}
            </AlertDialog>
    </div>
    </>
  }
  return (


    <div className="ml-10">
      <h1 className="text-2xl font-semibold m-10">Images</h1>
      <div className="border border-green-800  p-2 rounded-md min-w-36 max-w-48 text-center">

      <AlertDialog >
          <AlertDialogTrigger onClick={handleShowAddImageModal}>Add New Image</AlertDialogTrigger>
          {showAddImageModal&&(
            <AddCommunityImages refetch={refetch} setShowAddImageModal={setShowAddImageModal} commId={data._id}/>)}
            </AlertDialog>

      </div>
      {data?.hero&&(
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl No:</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>Banner Image</TableCell>
            <TableCell>
              <img src={data?.hero?.url} alt="" className="w-[200px] mx-auto" />
            </TableCell>
            {data?.hero && (
              <TableCell >
                <CustomAlertButton
                  title="Are you absolutely sure?"
                  description="This action cannot be undone. This will permanently delete the image."
                  cancelText="Cancel"
                  confirmText="Continue"
                  onConfirm={() => deleteImageHandler('hero', data?.hero.url,data?.hero.publicId)}
                >
                  <Button className="bg-red-300 p-2 text-black ml-2 hover:bg-red-500">
                    Delete
                  </Button>
                </CustomAlertButton>

              </TableCell>
            )}
          </TableRow>
          
        </TableBody>
      </Table>
      )}
    </div>
  );
};

export default CommunityImages;
