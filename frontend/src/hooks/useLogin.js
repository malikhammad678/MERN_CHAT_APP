import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/Authcontext';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setauthUser } = useAuthContext();

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.status !== 201) { 
        const errorMessage = data.error || "Invalid login credentials.";
        toast.error(errorMessage);
        return false;
      }

      localStorage.setItem("chat-app", JSON.stringify(data));
      setauthUser(data);
      return true;

    } catch (error) {
      toast.error("An error occurred while logging in.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { loading, login };
}

export default useLogin;
