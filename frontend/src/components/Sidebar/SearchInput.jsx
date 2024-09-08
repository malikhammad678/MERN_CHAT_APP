import React, { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import useConversation from '../../zustand/useConversation';
import toast from 'react-hot-toast';
import useGetConversation from '../../hooks/useGetConversation';

const SearchInput = () => {
  const [search, setsearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();

  const getFilterResult = (e) => {
    e.preventDefault();
    if (!search) {
      return toast.error("Please enter a user name");
    }

    // Log the initial search input
    console.log("Search Input:", search);

    const conversationFilter = conversations.filter((c) => {
    
      console.log("Conversation Object:", c);
      return c.fullname && c.fullname.toLowerCase().includes(search.toLowerCase());
    });

  
    console.log("Filtered Result:", conversationFilter);

    if (conversationFilter.length > 0) {
      setSelectedConversation(conversationFilter[0]); 
      setsearch('');
    } else {
      toast.error("User not found");
    }
  }

  return (
    <form className='flex items-center gap-2' onSubmit={getFilterResult}>
      <input 
        type="text" 
        placeholder='Search' 
        className='input input-bordered rounded-full'
        value={search}
        onChange={(e) => setsearch(e.target.value)}
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  )
}

export default SearchInput;
