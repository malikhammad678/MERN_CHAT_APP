import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/Authcontext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
   const { setauthUser } = useAuthContext();

    const signup = async ({ fullname, username, password, confirmpassword, gender }) => {
        const success = handleInputErrors({ fullname, username, password, confirmpassword, gender });
        if (!success) return; 
        
        setLoading(true);
        
        try {
            let response = await fetch("/api/auth/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullname, username, password,confirmpassword, gender })
            });

            const data = await response.json();
             if(data.error) {
                throw new Error(data.error);
             }

             localStorage.setItem("chat-app",JSON.stringify(data));

              setauthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullname, username, password, confirmpassword, gender }) {
    if (!fullname || !username || !password || !confirmpassword || !gender) {
        toast.error("Please fill out all fields!");
        return false;
    }

    if (password !== confirmpassword) {
        toast.error("Passwords do not match!");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long!");
        return false;
    }

    return true; 
}
