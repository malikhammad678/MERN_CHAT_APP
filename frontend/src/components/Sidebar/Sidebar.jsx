import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutUser from './LogoutUser'

const Sidebar = () => {
  return (
    <div className='p-4'>
    <SearchInput />
      <div className="divider px-3"></div>
    <Conversations />
     <LogoutUser />
    </div>
  )
}

export default Sidebar



// import React from 'react'
// import SearchInput from './SearchInput'
// import Conversations from './Conversations'
// import LogoutUser from './LogoutUser'

// const Sidebar = () => {
//   return (
//     <div>
//     <SearchInput />
//       <div className="divider px-3"></div>
//     <Conversations />
//      <LogoutUser />
//     </div>
//   )
// }

// export default Sidebar
