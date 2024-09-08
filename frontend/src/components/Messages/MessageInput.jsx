import React, { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessages from '../../hooks/useSendMessages';

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const { sendMessage, loading } = useSendMessages();

  const handleForm = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className='px-4 my-3' onSubmit={handleForm}>
      <div className='w-full relative'>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
          placeholder='Send message'
        />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
          {
            loading ? <span className='loading loading-spinner'></span> : <BsSend className="text-white" />
          }
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
