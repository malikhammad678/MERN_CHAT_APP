import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetConversation = () => {
  const [loading, setloading] = useState(false);
  const [conversations, setconversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setloading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          const errorData = data.error || "Error";
          toast.error(errorData);
          return false;
        }
        setconversations(data);
        console.log("Fetched Conversations:", data); 
      } catch (error) {
        toast.error(error.message || error);
      } finally {
        setloading(false);
      }
    }
    getConversations();
  }, []);

  return {
    loading,
    conversations
  }
}

export default useGetConversation;
