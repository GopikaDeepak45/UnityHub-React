

import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useIsUserGroupMemberQuery } from '@/redux/apiSlices/groupApiSlice';
import { useLocation } from 'react-router-dom';
import JoinGroup from '@/components/JoinGroup';
import GroupsDataPage from '@/components/GroupsDataPage';
import GroupsDataPage2 from '@/components/GroupDataPage2';
import { MessageSquareX, MessagesSquare } from 'lucide-react';
import GroupChat from '@/components/GroupChat';

interface Group {
    _id: string;
    name: string;
    description: string;
    image: {
        url: string;
    };
}

interface LocationState {
    group: Group;
}

const GroupHomePage = () => {
    const { userId="",username="" } = useAuth();
    const location = useLocation();
    const state = location.state as LocationState;
    const { group } = state;
    const { data,refetch } = useIsUserGroupMemberQuery({ groupId: group._id, userId });

    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const handleChatClick = () => {
        if (!userId) {
            alert('You need to log in to access the chat.');
            return;
          }
        if (data?.isMember) {
            setIsModalOpen(true);
        } else {
            alert("You need to join the group to access the chat.");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative h-screen overflow-auto">
            <div
                className="fixed inset-0 bg-white opacity-50"
                style={{
                    backgroundImage: `url(${group.image.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1,
                }}
            ></div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-opacity-70  p-6 text-center shadow-lg ">
                <h1 className="text-6xl font-bold">{group.name}</h1>
                <p className="text-lg mt-4">{group.description}</p>
            </div>
            <div className="absolute top-5 right-5">
                <button onClick={handleChatClick} className="p-3 bg-blue-500 text-white rounded-full shadow-lg">
                    {/* <FaComments size={24} /> */}
                    <MessagesSquare/>
                </button>
            </div>
            <div className="relative p-8 text-black mt-44">
                {data?.isMember ? (
                    <GroupsDataPage2 groupId={group._id} />
                ) : (
                    <JoinGroup refetch={refetch} groupId={group._id} />
                )}
            </div>

            {isModalOpen && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                 <div className="bg-white rounded-lg w-[600px] h-[95vh] flex flex-col">
                   <div className="flex justify-end p-4">
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800">
                            <MessageSquareX/>
                            </button>
                        </div>
                        <div className="flex-grow overflow-y-auto p-4">
                           
                            <GroupChat groupId={group._id} groupName={group.name} userId={userId} userName={username}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupHomePage;
