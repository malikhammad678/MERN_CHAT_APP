import React, { useState } from 'react'
import { useAuthContext } from '../context/Authcontext';

const useLogout = () => {
    const [loading,setloading] = useState(false);
    const {setauthUser} = useAuthContext();

   const logout = async () => {
    setloading(true);
    try {
        const res = await fetch("/api/auth/logout", {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
        })
        const data = await res.json();
        if(data.error){
            throw new Error(data.error);
        }

        localStorage.removeItem("chat-app");
        setauthUser(null);

    } catch (error) {
        
    } finally {

    }
   }




  return { loading,logout }
}

export default useLogout
