import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import MesageContainer from '../../components/Messages/MesageContainer'
const Home = () => {
  
  return (
    <div className='flex sm:h-[450px] md:h-[600px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
    <Sidebar />
    <MesageContainer />
    </div>
  )
}

export default Home
