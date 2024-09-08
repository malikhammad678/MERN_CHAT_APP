
import { createContext, useContext, useState } from "react";



export const Authcontext = createContext();

export const useAuthContext = () => {
    return useContext(Authcontext);
}

export const AuthContextProvider = ({children}) => {
    
    const [authUser,setauthUser]  =  useState(JSON.parse(localStorage.getItem("chat-app")) || null);

    return (
        <Authcontext.Provider value={{authUser,setauthUser}}>
          { children }
        </Authcontext.Provider>
    )
}

