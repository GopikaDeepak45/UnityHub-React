import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { SetStateAction, useEffect, useState } from "react";
import { useFetchCommunityDataQuery } from "@/redux/apiSlices/adminApiSlice";

import { Input } from "@/components/ui/input";
import BlockCommunity from "@/components/BlockCommunity";
import MessageCommunity from "@/components/MessageToCommAdmin";
import PaginationComponent from "@/components/PaginationComponent";
import UnBlockCommunity from "@/components/UnBlockCommunity";
import ProgressDemo from "@/components/ProgressDemo";
import ErrorComponent from "@/components/ErrorComponent";

const Communities = () => {
  console.log('Communities component rendered')
  
  const { data = [], error, isLoading, refetch } = useFetchCommunityDataQuery(undefined);


  const [communities, setCommunities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showUnblockModal, setShowUnblockModal] = useState(false);
  const [blockReason,setBlockReason]=useState(null)
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedCommunityAdminEmail, setSelectedCommunityAdminEmail] = useState(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const [selectedName, setSelectedName] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    // When data is fetched successfully, update the state
    if (!isLoading && !error) {
      setCommunities(data.communityData);
    }
  }, [data, isLoading, error]);

  
  if (isLoading) return  <ProgressDemo isLoading={isLoading} />;
  if (error) return <ErrorComponent />;

  const filteredCommunities = communities.filter((community: any) =>
    community.communityId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.communityId.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  let paginatedCommunities

  if (filteredCommunities.length > itemsPerPage) {
    paginatedCommunities = filteredCommunities.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  } else {
    paginatedCommunities = filteredCommunities
  }
  //to manage modal display
  const handleShowMessageModal = (email: any, name: any) => {
   setSelectedCommunityAdminEmail(email)
    setSelectedName(name)
    setShowMessageModal(true);
  };
  const handleShowBlockModal = (communityId: any,email:any) => {
    setSelectedCommunityAdminEmail(email)
    setSelectedCommunityId(communityId);
    setShowBlockModal(true);
  };
  const handleShowUnblockModal = (communityId: any,reason:any) => {
    setSelectedCommunityId(communityId);
    setBlockReason(reason)
    setShowUnblockModal(true);
  };


  const totalPages = Math.ceil(filteredCommunities.length / itemsPerPage);

  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };
  return (
    <div className="ml-10">
      <h1 className="text-2xl font-semibold m-10">Communities</h1>
      <Input
        type="text"
        className="px-3 py-2 w-80"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sl NO:</TableHead>
            <TableHead>Community Name</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Admin Name</TableHead>
            <TableHead>Admin Email</TableHead>
            <TableHead>Mobile No</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCommunities.map((elem: any, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
              <TableCell>{elem.communityId.name}</TableCell>
              <TableCell>{elem.communityId.location}</TableCell>
              <TableCell>{elem.userName}</TableCell>
              <TableCell>{elem.email}</TableCell>
              <TableCell>{elem.mobileNo}</TableCell>
              <TableCell >

                <AlertDialog>
                  <AlertDialogTrigger onClick={() => handleShowMessageModal(elem.email, elem.userName)} className="rounded-md bg-gray-200 p-2 text-black ml-2 hover:bg-gray-400 ">Message</AlertDialogTrigger>
                  {showMessageModal && (
                    <MessageCommunity setShowMessageModal={setShowMessageModal}
                      selectedCommunityAdminEmail={selectedCommunityAdminEmail}
                      name={selectedName}
                      refetch={refetch} />
                  )}
                </AlertDialog>

                {elem.communityId.isBlocked ? 
                <AlertDialog>
                  <AlertDialogTrigger onClick={() => handleShowUnblockModal(elem.communityId._id,elem.communityId.blockReason)} className="rounded-md bg-green-300 p-2 text-black ml-2 hover:bg-green-500 ">Unblock</AlertDialogTrigger>
                  {showUnblockModal && (
                    <UnBlockCommunity setShowUnblockModal={setShowUnblockModal}
                      selectedCommunityId={selectedCommunityId}
                      blockReason={blockReason}
                      refetch={refetch} />
                  )}
                </AlertDialog> 
                : 
                <AlertDialog>
                  <AlertDialogTrigger onClick={() => handleShowBlockModal(elem.communityId._id,elem.email)} className="rounded-md bg-red-500 p-2 px-4 text-black ml-2 hover:bg-red-700 ">Block</AlertDialogTrigger>
                  {showBlockModal && (
                    <BlockCommunity setShowBlockModal={setShowBlockModal}
                      selectedCommunityId={selectedCommunityId}
                      selectedCommunityAdminEmail={selectedCommunityAdminEmail}
                      refetch={refetch} />
                  )}
                </AlertDialog>}

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredCommunities.length > itemsPerPage && (

        <PaginationComponent totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />

      )}
    </div>
  );
};

export default Communities;
