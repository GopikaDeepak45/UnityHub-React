
// import { useState, useEffect, useRef } from 'react';
// import { io, Socket } from 'socket.io-client';
// import { useFetchChatHistoryQuery } from '@/redux/apiSlices/chatApiSlice';

// interface Message {
//   fromUserId: string;
//   toUserId: string;
//   message: string;
//   timestamp?: Date;
// }

// let socket: Socket;

// const PersonalChat = ({ fromUserId, toUserId }: { fromUserId: string; toUserId: string }) => {
//   const [message, setMessage] = useState('');
//   const [messageList, setMessageList] = useState<Message[]>([]);
//   const messageContainerRef = useRef<HTMLDivElement>(null);

//   // Fetch old messages using RTK Query
//   const { data: chatHistory, isLoading, error } = useFetchChatHistoryQuery({ fromUserId, toUserId });

//   // Scroll to the bottom of the chat container
//   const scrollToBottom = () => {
//     if (messageContainerRef.current) {
//       messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
//     }
//   };

//   // Load chat history when data is fetched and scroll to bottom
//   useEffect(() => {
//     if (chatHistory) {
//       setMessageList(chatHistory);
//       scrollToBottom(); // Scroll to the bottom on load
//     }
//   }, [chatHistory]);

//   // Initialize Socket.IO connection
//   useEffect(() => {
//     socket = io('http://localhost:3000'); // Connect to Socket.IO server

//     // Listen for new messages from the server
//     socket.on('receive_message', (newMessage: Message) => {
//       setMessageList((prev) => [...prev, newMessage]);
//       scrollToBottom(); // Scroll to the bottom when a new message is received
//     });

//     return () => {
//       // Clean up when component unmounts
//       socket.off('receive_message');
//       socket.disconnect();
//     };
//   }, []);

//   // Handle sending messages using Socket.IO
//   const handleSendMessage = () => {
//     const newMessage: Message = {
//       fromUserId,
//       toUserId,
//       message,
//       timestamp: new Date(),
//     };

//     socket.emit('send_message', newMessage); // Emit message to server
//     setMessage(''); // Clear input
//   };

//   if (isLoading) return <div>Loading chat history...</div>;
//   if (error) return <div>Error loading chat history</div>;

//   return (
//     <div className="flex flex-col h-screen max-w-lg mx-auto bg-gray-100">
//       {/* Header (Fixed) */}
//       <div className="p-4 bg-blue-500 text-white text-lg font-bold flex-shrink-0">
//         Chat with {toUserId}
//       </div>

//       {/* Messages container */}
//       <div
//         className="flex-grow p-4 overflow-y-auto flex flex-col-reverse"
//         ref={messageContainerRef}
//       >
//         <div>
//           {messageList.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex flex-col max-w-xs mb-4 ${
//                 msg.fromUserId === fromUserId
//                   ? 'ml-auto bg-green-200 rounded-tl-lg rounded-tr-lg rounded-br-lg'
//                   : 'mr-auto bg-blue-300 rounded-tl-lg rounded-tr-lg rounded-bl-lg'
//               } p-3`}
//             >
//               <div className="text-sm text-gray-900">{msg.message}</div>
//               <div className="text-xs text-gray-500 text-right mt-1">
//                 {new Date(msg.timestamp!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Message input container (Fixed at Bottom) */}
//       <div className="flex items-center p-4 bg-white border-t border-gray-300 flex-shrink-0">
//         <input
//           type="text"
//           className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
//           placeholder="Type a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="ml-2 bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition duration-300"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PersonalChat;


import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useFetchChatHistoryQuery } from '@/redux/apiSlices/chatApiSlice';

interface Message {
  fromUserId: string;
  toUserId: string;
  message: string;
  timestamp?: Date;
}

let socket: Socket;

const PersonalChat = ({ fromUserId, toUserId,chatUserName }: { fromUserId: string; toUserId: string; chatUserName:string }) => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<Message[]>([]);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Fetch old messages using RTK Query
  const { data: chatHistory, isLoading, error } = useFetchChatHistoryQuery({ fromUserId, toUserId });

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
    socket = io('http://localhost:3000'); // Connect to Socket.IO server  this will be enough tosend to all but if need a separate space for chat below codes alo, create a chat room then in that chat so in dependency also need to give ids of frm and to , otherwise no need 

// Emit the 'join_room' event with the calculated room key
socket.emit('join_room', { fromUserId, toUserId });

    // Listen for new messages from the server
    socket.on('receive_message', (newMessage: Message) => {
      setMessageList((prev) => [...prev, newMessage]);
      scrollToBottom(); // Scroll to the bottom when a new message is received
    });

    return () => {
      // Clean up when component unmounts
      socket.off('receive_message');
      socket.disconnect();
    };
  }, [fromUserId,toUserId]);

  // Handle sending messages using Socket.IO
  const handleSendMessage = () => {
    const newMessage: Message = {
      fromUserId,
      toUserId,
      message,
      timestamp: new Date(),
    };

    socket.emit('send_message', newMessage); // Emit message to server
    setMessage(''); // Clear input
  };

  if (isLoading) return <div>Loading chat history...</div>;
  if (error) return <div>Error loading chat history</div>;

  
  return (
    <div className="flex flex-col h-[80vh] max-w-lg mx-auto bg-gray-100">
      {/* Header (Fixed size at the top) */}
      <div className="p-4 bg-gray-500 text-white text-lg font-bold flex-shrink-0">
       {chatUserName.toUpperCase()}
      </div>
       <div
        className="flex-grow p-4 overflow-y-auto flex flex-col-reverse"
        ref={messageContainerRef}
      >
        <div className="flex flex-col">
          {messageList.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col max-w-xs mb-4 ${
                msg.fromUserId === fromUserId
                  ? 'ml-auto bg-green-200 rounded-tl-lg rounded-tr-lg rounded-br-lg'
                  : 'mr-auto bg-blue-300 rounded-tl-lg rounded-tr-lg rounded-bl-lg'
              } p-3`}
            >
              <div className="text-sm text-gray-900">{msg.message}</div>
              <div className="text-xs text-gray-500 text-right mt-1">
                {new Date(msg.timestamp!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      </div>
  
      {/* Message input container (Fixed size at the bottom) */}
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

export default PersonalChat;
