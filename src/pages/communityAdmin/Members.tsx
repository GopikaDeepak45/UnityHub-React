import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,

  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import AddCommunityMember from "@/components/AddCommunityMember"
import useAuth from "@/hooks/useAuth"
import { useGetCommunityDataQuery } from "@/redux/apiSlices/commAdminApiSlice"
import { SetStateAction, useEffect, useState } from "react"
import PaginationComponent from "@/components/PaginationComponent"
import DetailedCommunityMember from "@/components/DetailedCommMember"
import DeleteCommMember from "@/components/DeleteCommMember"
import ErrorComponent from "@/components/ErrorComponent"
import ProgressDemo from "@/components/ProgressDemo"


const Members = () => {
  const { userId: commAdminId } = useAuth();
  const { data, error, isLoading, refetch } = useGetCommunityDataQuery(commAdminId);

  const [commMembers, setCommMembers] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal,setShowDeleteModal]=useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    // When data is fetched successfully, update the state
    if (!isLoading && !error) {
      setCommMembers(data.members)
    }
  }, [data, isLoading, error]);

  if (isLoading) return  <ProgressDemo isLoading={isLoading} />;
  if (error) return <ErrorComponent message={error.data.message} />;
  
  const filteredMembers = commMembers.filter((member: any) =>
    member.flatNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.contactNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let paginatedMembers

  if (filteredMembers.length > itemsPerPage) {
    paginatedMembers = filteredMembers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  } else {
    paginatedMembers = filteredMembers
  }

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };
  const handleShowDetailModal = () => {
    setShowDetailModal(true)
  }
  const handleShowDeleteModal=()=>{
    setShowDeleteModal(true)
  }
 
  if(data.members.length===0) return(<>
  <div className="flex justify-center text-4xl mt-10">No Members data available...</div>
<div className="border border-green-800  p-2 rounded-md min-w-36 max-w-48 text-center">

            <AddCommunityMember refetch={refetch} />
          </div>
          </>)
 
  return (
    <div className="ml-10">
      <h1 className="text-2xl font-semibold  m-10 ">Community Members</h1>
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

            <AddCommunityMember refetch={refetch} />
          </div>
        </div>
      </div>
      <Table >
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl NO:</TableHead>
            <TableHead>Block</TableHead>
            <TableHead>Flat No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact No</TableHead>
            <TableHead >Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedMembers.map((member: any, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
              <TableCell>{member.block}</TableCell>
              <TableCell>{member.flatNo}</TableCell>
              <TableCell>{member.userName}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.contactNo}</TableCell>
              <TableCell >
                <AlertDialog>
                  <AlertDialogTrigger onClick={() => handleShowDetailModal()} className="rounded-md bg-gray-300 p-2 text-black ml-2 hover:bg-gray-500 ">Show Detail</AlertDialogTrigger>
                  {showDetailModal &&
                    // <DetailedMember member={member} />
                    <DetailedCommunityMember member={member} refetch={refetch} setShowDetailModal={setShowDetailModal}/>
                  }
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger onClick={() => handleShowDeleteModal()} className="rounded-md bg-red-300 p-2 text-black ml-2 hover:bg-red-500 ">Delete</AlertDialogTrigger>
                  {showDeleteModal &&
                    // <DetailedMember member={member} />
                    <DeleteCommMember memberId={member._id} refetch={refetch} />
                  }
                </AlertDialog>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredMembers.length > itemsPerPage && (
        <PaginationComponent totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
      )}
    </div>
  )
}

export default Members