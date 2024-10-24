
import React, { useEffect, useState } from 'react';
import useAuth from "@/hooks/useAuth";
import profileImg from '../assets/profile.png';
import { useAcceptConnectionRequestMutation, useDeclineConnectionRequestMutation, useGetUserConnectionsQuery } from '@/redux/apiSlices/connectionApiSlice';
import { MessageSquareMore, MessageSquareX } from 'lucide-react';
import PersonalChat from './PersonalChat';

interface ConnectionRequest {
  _id: string;
  fromUserId: { _id: string; userName: string; profileImg: { url: string } };
  status: 'pending' | 'accepted' | 'declined';
  sentAt: Date;
}
interface IRequest {
  status: string;
}
interface User {
  _id: string;
  userName: string;
  profileImg: { url: string };
}

const Right: React.FC = () => {
  const { userId } = useAuth() as { userId: string };
  const { data: connectionsData = { connections: [], connectionRequests: [] }, error, isLoading, refetch } = useGetUserConnectionsQuery({ userId });
  const [acceptConnectionRequest] = useAcceptConnectionRequestMutation();
  const [declineConnectionRequest] = useDeclineConnectionRequestMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toUserIdChat, setToUserIdChat] = useState("");
  const [chatUserName,setChatUserName]=useState("")

  const hasPendingRequests = connectionsData.connectionRequests.some(
    (request: IRequest) => request.status === 'pending'
  );
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Disable page scroll
    } else {
      document.body.style.overflow = "auto"; // Enable page scroll
    }

    // Cleanup when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await acceptConnectionRequest({ toId: userId, fromId: requestId }).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to accept connection request', error);
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    try {
      await declineConnectionRequest({ toId: userId, fromId: requestId }).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to decline connection request', error);
    }
  };

  const handleChatClick = (id: string,name:string) => {
    setIsModalOpen(true);
    setToUserIdChat(id);
    setChatUserName(name)
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading connections</div>;

  return (
    <div className="w-full lg:w-2/6 px-4 rounded-md border-2 py-5">
      {hasPendingRequests && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Pending Requests</h2>
          {connectionsData.connectionRequests
            .filter((req: ConnectionRequest) => req.status === 'pending')
            .map((request: ConnectionRequest) => (
              <div key={request._id} className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4 mb-4">
                <img
                  src={request.fromUserId.profileImg?.url || profileImg}
                  alt={request.fromUserId.userName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{request.fromUserId.userName}</h2>
                  <div className="flex space-x-2">
                    <button
                      className="px-2 py-1 bg-green-500 hover:bg-green-800 text-white rounded"
                      onClick={() => handleAcceptRequest(request.fromUserId._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 hover:bg-red-700 text-white rounded"
                      onClick={() => handleDeclineRequest(request.fromUserId._id)}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Connections</h2>
      {connectionsData.connections.map((connection: User) => (
        <div key={connection._id} className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4 mb-4">
          <img
            src={connection.profileImg?.url || profileImg}
            alt={connection.userName}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{connection.userName}</h2>
          </div>
          <button
            onClick={() => handleChatClick(connection._id,connection.userName)}
            className="p-3 bg-blue-500 text-white rounded-full shadow-lg"
          >
            <MessageSquareMore />
          </button>
        </div>
      ))}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-[600px] h-[95vh] flex flex-col">
            <div className="flex justify-end p-4">
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800">
                <MessageSquareX />
              </button>
            </div>

        
            <div className="flex-grow overflow-y-auto p-4">
              <PersonalChat fromUserId={userId} toUserId={toUserIdChat} chatUserName={chatUserName}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Right;
