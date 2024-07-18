import useAuth from '@/hooks/useAuth'
import { useFetchGroupMembersQuery } from '@/redux/apiSlices/groupApiSlice'
import profileImg from '../assets/profile.png'
import PersonalChat from './PersonalChat'
import { MessageSquareMore, MessageSquareX } from 'lucide-react'
import { useSendConnectionRequestMutation } from '@/redux/apiSlices/connectionApiSlice'
import ProgressDemo from './ProgressDemo'
import ErrorComponent from './ErrorComponent'
import { useState } from 'react'
interface IGroupMmeberProps{
  groupId:string
}
interface ConnectionRequest {
  fromUserId: string;
  status: 'pending' | 'accepted' | 'declined';
}
interface User {
  _id: string;
  userName: string;
  profileImg: { url: string };
  block: string;
  connectionRequests: ConnectionRequest[];
}
const GroupMembersList = ({groupId}:IGroupMmeberProps) => {
  const{userId:fromId}=useAuth()
  const{data:users,refetch,isLoading,error}=useFetchGroupMembersQuery({userId:fromId,groupId})
  const [sendConnectionRequest] = useSendConnectionRequestMutation();
  const [isModalOpen,setIsModalOpen]=useState(false)
  const handleConnect = async (userId: string) => {
    try {

      await sendConnectionRequest({fromId,toId:userId}).unwrap();
      refetch()
      // Optionally, you can add local state update logic here if needed
    } catch (error) {
      console.error('Failed to send connection request', error);
    }
  };
  const getConnectionStatus = (user: User): 'accepted' | 'pending' | 'declined'|'connect' => {

    const pendingRequest = user.connectionRequests.find(
      (request: ConnectionRequest) => request.fromUserId === fromId);
  
    if (pendingRequest) {
      return pendingRequest.status;
    }
   else{
    return 'connect';
   }
    
  };
  
if (isLoading) return  <ProgressDemo isLoading={isLoading} />;
if (error) return <ErrorComponent message={error.data.message} />;

  return (

   
<div className="container mx-auto p-4 border rounded-lg md:h-full">
    <h1 className="text-3xl font-bold  text-center mb-5">Community Members</h1>
   
     
   
      {users.map((user: User) => {
        if (user._id === fromId) {
          return null;
        }
        const connectionStatus = getConnectionStatus(user);
        console.log('user- ststus',user.userName,connectionStatus)
        return (
          <div key={user._id} className="bg-white p-1 rounded-lg shadow-lg flex items-center space-x-4 mb-1">
            <img
              src={user.profileImg?.url || profileImg}
              alt={user.userName}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{user.userName}</h2>
              <p className="text-gray-600">Block: {user.block}</p>
              
            </div>
            {connectionStatus === 'connect' && (
              <button
                className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white"
                onClick={() => handleConnect(user._id)}
              >
                Connect
              </button>
            )}
            {connectionStatus === 'pending' && (
              <button
                className="px-4 py-2 rounded bg-green-500 cursor-default text-white"
               
              >
                {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
              </button>
            )}
            {connectionStatus === 'declined' && (
              <button
                className="px-4 py-2 rounded cursor-default bg-red-500 text-white"
                
              >
                {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
              </button>
            )}
           
          </div>
        );
      })}
  
 
           </div>
  )
}

export default GroupMembersList