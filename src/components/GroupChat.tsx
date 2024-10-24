


import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useFetchGroupChatHistoryQuery } from '@/redux/apiSlices/chatApiSlice'; // Assuming you have RTK Query setup for group chat

interface GroupMessage {
  fromUserId: string;
  userName: string; 
  groupId: string;
  message: string;
  timestamp?: Date;
}

let socket: Socket;

const GroupChat = ({ groupId, userId,userName, groupName }: { groupId: string; userId: string; userName:string; groupName: string }) => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<GroupMessage[]>([]);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Fetch group chat history using RTK Query
  const { data: chatHistory, isLoading, error } = useFetchGroupChatHistoryQuery({ groupId });
console.log('chat history',chatHistory)
  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  // Load chat history when data is fetched and scroll to bottom
  useEffect(() => {
    if (chatHistory) {
      setMessageList(chatHistory);
      scrollToBottom(); // Scroll to the bottom on load
    }
  }, [chatHistory]);

  // Initialize Socket.IO connection
  useEffect(() => {
    socket = io('http://localhost:3000'); // Connect to Socket.IO server

    // Join the group room
    socket.emit('join_group', groupId);

    // Listen for new messages in the group
    // socket.on('receive_group_message', (newMessage: GroupMessage) => {
    //   setMessageList((prev) => [...prev, newMessage]);
    //   scrollToBottom(); // Scroll to the bottom when a new message is received
    // });
    socket.on('receive_group_message', (newMessage: GroupMessage) => {
      setMessageList((prev) => [
        ...prev,
        {
          ...newMessage,
          timestamp: new Date(newMessage.timestamp || Date.now()) // Ensure it's a Date object
        }
      ]);
      scrollToBottom(); // Scroll to the bottom when a new message is received
    });
    

    return () => {
      // Clean up when component unmounts
      socket.off('receive_group_message');
      socket.disconnect();
    };
  }, [groupId]);

  // Handle sending messages using Socket.IO
  const handleSendMessage = () => {
    const newMessage: GroupMessage = {
      fromUserId: userId,
      userName: userName, 
      groupId,
      message,
      timestamp: new Date(),
    };

    socket.emit('send_group_message', newMessage); // Emit group message to server
    setMessage(''); // Clear input
  };

  if (isLoading) return <div>Loading group chat history...</div>;
  if (error) return <div>Error loading group chat history</div>;

  return (
    <div className="flex flex-col h-[85vh] max-w-lg mx-auto bg-gray-100">
      {/* Header (Fixed size at the top) */}
      <div className="p-4 bg-gray-500 text-white text-lg font-bold flex-shrink-0">
        {groupName.toUpperCase()}
      </div>
  
      {/* Messages container */}
      <div
        className="flex-grow p-4 overflow-y-auto flex flex-col-reverse"
        ref={messageContainerRef}
      >
        <div className="flex flex-col">
          {messageList.map((msg, index) => (
            <div key={index} className="mb-4">
              {/* Display username above the message */}
              {/* <div className="text-xs text-gray-600 mb-1">
                {msg.userName}
              </div> */}
              <div
                className={`flex flex-col max-w-xs ${
                  msg.fromUserId === userId
                    ? 'ml-auto bg-green-200 rounded-tl-lg rounded-tr-lg rounded-br-lg'
                    : 'mr-auto bg-blue-300 rounded-tl-lg rounded-tr-lg rounded-bl-lg'
                } p-3`}
              ><div className="text-sm font-extrabold text-gray-600 mb-1">
            {msg.fromUserId !== userId ? msg.userName : ''}
            </div>
                <div className="text-sm text-gray-900 ">{msg.message}</div>
                <div className="text-xs  text-right mt-1">
                  {new Date(msg.timestamp!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message input container */}
      <div className="p-4 bg-white border-t border-gray-300 flex-shrink-0 flex items-center">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChat;

