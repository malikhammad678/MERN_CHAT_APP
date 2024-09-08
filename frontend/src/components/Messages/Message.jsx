import React from 'react';
import { useAuthContext } from '../../context/Authcontext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/ExtractTime';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
   
  const formatedTime = extractTime(message.createdAt);

  const fromMe = message.senderId === authUser.userId;


  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-black";

  const shakeClass = message.shouldShake ? "shake": ""
  

  let profilepic;
  if (fromMe) {
    profilepic = authUser.profilepic;
  } else if (selectedConversation) {
    profilepic = selectedConversation.profilepic;
  }


  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={profilepic} alt="user avatar" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
        {message.message}
      </div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
       {formatedTime}
      </div>
    </div>
  );
};

export default Message;
