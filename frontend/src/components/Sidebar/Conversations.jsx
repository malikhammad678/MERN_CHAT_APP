import React from 'react'
import Conversation from './Conversation'
import useGetConversation from '../../hooks/useGetConversation';

const Conversations = () => {
  const {loading,conversations}  = useGetConversation();
  console.log(conversations);
  return (
    <div className = "py-2 flex flex-col overflow-auto">
        
        {
          conversations.map((conversation,index) => {
           return <Conversation
            key = {conversation._id}
            conversation = {conversation} 
            lastIndex = {index === conversations.length - 1}
             />
          })
        }

       {
        loading ? <span className='loading loading-spinner'></span> : null
       }
    </div>
  )
}

export default Conversations


// import React from 'react'
// import Conversation from './Conversation'

// const Conversations = () => {
//   return (
//     <div className = "py-2 flex flex-col overflow-auto">
//        <Conversation />
//        <Conversation />
//        <Conversation />
//        <Conversation />
//        <Conversation />
//        <Conversation />
//     </div>
//   )
// }

// export default Conversations
