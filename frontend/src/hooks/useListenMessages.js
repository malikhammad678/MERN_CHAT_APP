import React, { useEffect } from 'react'
import { userSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation';

const useListenMessages = () => {
  const {socket} = userSocketContext();
  const {messages,setMessages} = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true
        setMessages([...messages, newMessage ])
    })

    return () => socket.off("newMessage")
  },[socket,setMessages,messages])
}

export default useListenMessages
