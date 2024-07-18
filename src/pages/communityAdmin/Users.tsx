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
  import { SetStateAction, useState } from "react"
  import PaginationComponent from "@/components/PaginationComponent"
  import ErrorComponent from "@/components/ErrorComponent"
  import ProgressDemo from "@/components/ProgressDemo"
import { useGetUsersDataQuery } from "@/redux/apiSlices/commAdminApiSlice"
import BlockUser from "@/components/BlockUser"
import UnblockUser from "@/components/UnblockUser"
  
  
  const Users = () => {
    const { userId: commAdminId } = useAuth();
    const { data:users, error, isLoading, refetch } = useGetUsersDataQuery(commAdminId);
  
    const [searchQuery, setSearchQuery] = useState("");
    const [showBlockModal, setShowBlockModal] = useState(false);
  const [showUnblockModal, setShowUnblockModal] = useState(false);
  const [blockReason,setBlockReason]=useState(null)
  const[selectedUserId,setSelectedUserId]=useState(null)
  const[selectedUserEmail,setSelectedUserEmail]=useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
  
    
    if (isLoading) return  <ProgressDemo isLoading={isLoading} />;
    if (error) return <ErrorComponent message={error.data.message} />;
    if(users.length===0) return(<>
        <div className="flex justify-center text-4xl mt-10">No Members data available...</div>
      <div className="border border-green-800  p-2 rounded-md min-w-36 max-w-48 text-center">
      
                  <AddCommunityMember refetch={refetch} />
                </div>
                </>)
       
    
       const filteredMembers = users.filter((member: any) =>
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
    const handleShowBlockModal = (userId: any,email:any) => {
        setSelectedUserEmail(email)
        setSelectedUserId(userId);
        setShowBlockModal(true);
      };
      const handleShowUnblockModal = (userId: any,reason:any) => {
        setSelectedUserId(userId);
        setBlockReason(reason)
        setShowUnblockModal(true);
      };
   
    return (
      <div className="ml-10">
        <h1 className="text-2xl font-semibold  m-10 ">UnityHub Users</h1>
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
            {paginatedMembers.map((member: any, index:number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                <TableCell>{member.block}</TableCell>
                <TableCell>{member.flatNo}</TableCell>
                <TableCell>{member.userName}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.contactNo}</TableCell>
                <TableCell >
                  {member.isBlocked?<AlertDialog>
                  <AlertDialogTrigger onClick={() => handleShowUnblockModal(member._id,member.blockReason)} className="rounded-md bg-green-300 p-2 text-black ml-2 hover:bg-green-500 ">Unblock</AlertDialogTrigger>
                  {showUnblockModal && (
                    <UnblockUser setShowUnblockModal={setShowUnblockModal}
                      selectedUserId={selectedUserId}
                      blockReason={blockReason}
                      refetch={refetch} />
                  )}
                </AlertDialog> 
                : 
                <AlertDialog>
                  <AlertDialogTrigger onClick={() => handleShowBlockModal(member._id,member.email)} className="rounded-md bg-red-500 p-2 px-4 text-black ml-2 hover:bg-red-700 ">Block</AlertDialogTrigger>
                  {showBlockModal && (
                    <BlockUser setShowBlockModal={setShowBlockModal}
                      selectedUserId={selectedUserId}
                      selectedUserEmail={selectedUserEmail}
                      refetch={refetch} />
                  )}
                </AlertDialog>}
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
  
  export default Users