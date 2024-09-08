import React, { useState } from 'react';
import GenderCheck from './GenderCheck';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const Signup = () => {
  const [data, setData] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmpassword: '',
    gender: ''
  });

  const { loading, signup } = useSignup();

  const handleCheckBoxChange = (gender) => {
    setData({ ...data, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(data);
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <h1 className='text-3xl font-semibold text-center text-gray-50'>Signup <span className='text-blue-500'>ChatApp</span></h1>
      <form onSubmit={handleSubmit}>
        <div>
        <label className='label p-2'>
            <span className='text-base label-text'>Fullname</span>
          </label>
          <input type="text" placeholder='e.g,Malik Hammad' className='w-full input input-bordered h-10' value={data.fullname} onChange={(e) => setData({...data,fullname:e.target.value})} />
        </div>

        <div>
        <label className='label p-2'>
            <span className='text-base label-text'>Username</span>
        </label>
        <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10' value={data.username} onChange={(e) => setData({...data,username:e.target.value})} />
        </div>

        <div>
        <label className='label p-2'>
            <span className='text-base label-text'>Password</span>
        </label>
        <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10' value={data.password} onChange={(e) => setData({...data,password:e.target.value})} />
        </div>

        <div>
        <label className='label p-2'>
            <span className='text-base label-text'>Confirm Password</span>
        </label>
        <input type="password" placeholder='Confirm Password' className='w-full input input-bordered h-10' value={data.confirmpassword} onChange={(e) => setData({...data,confirmpassword:e.target.value})} />
        </div>

        <Link to='/login' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
          Already have an account?
        </Link>

        <GenderCheck handleCheckBoxChange = {handleCheckBoxChange} selectedGender = {data.gender} />

        <div>
          <button type='submit' className='btn btn-block btn-sm mt-2' disabled={loading}>
            {
              loading ? <span className='loading loading-spinner'></span> : "Sign up"
            }
          </button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Signup



// import React from 'react'
// import GenderCheck from './GenderCheck'

// const Signup = () => {
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//       <h1 className='text-3xl font-semibold text-center text-gray-50'>Signup <span className='text-blue-500'>ChatApp</span></h1>
//       <form>
//         <div>
//         <label className='label p-2'>
//             <span className='text-base label-text'>Fullname</span>
//           </label>
//           <input type="text" placeholder='e.g,Malik Hammad' className='w-full input input-bordered h-10' />
//         </div>

//         <div>
//         <label className='label p-2'>
//             <span className='text-base label-text'>Username</span>
//         </label>
//         <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10' />
//         </div>

//         <div>
//         <label className='label p-2'>
//             <span className='text-base label-text'>Password</span>
//         </label>
//         <input type="password" placeholder='Enter Password' className='w-full input input-bordered h-10' />
//         </div>

//         <div>
//         <label className='label p-2'>
//             <span className='text-base label-text'>Confirm Password</span>
//         </label>
//         <input type="password" placeholder='Confirm Password' className='w-full input input-bordered h-10' />
//         </div>

//         <a href="#" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
//           Already have an account?
//         </a>

//         <GenderCheck />

//         <div>
//           <button className='btn btn-block btn-sm mt-2'>Sign up</button>
//         </div>
//       </form>
//       </div>
//     </div>
//   )
// }

// export default Signup
