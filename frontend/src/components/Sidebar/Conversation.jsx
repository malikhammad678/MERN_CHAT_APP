import React from 'react';
import useConversation from '../../zustand/useConversation';
import { userSocketContext } from '../../context/SocketContext';

const Conversation = ({ conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = userSocketContext();

  // Log the online users to debug
  console.log("Online Users in Conversation component:", onlineUsers);

  const isSelected = selectedConversation?._id === conversation._id;
  const isSelectedonlineUsers = onlineUsers.includes(conversation._id);

  const handleClick = () => {
    setSelectedConversation(conversation);
  };

  return (
    <>
      <div 
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
        onClick={handleClick}
      >
        <div className={`avatar ${isSelectedonlineUsers ? "online" : "offline"}`}>
          <div className='w-12 rounded-full'>
            <img src={conversation.profilepic} alt="user avatar" />
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{conversation.fullname}</p>
          </div>
        </div>
      </div>

      {!lastIndex && <div className='divider my-0 py-0 h-1' />}
    </>
  );
}

export default Conversation;
