import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client';
import { useAuthContext } from "./Authcontext";

export const SocketContext = createContext();

export const userSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:5000", {
                query: {
                    userId: authUser.userId
                }
            });
            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                console.log("Online Users:", users); 
                setOnlineUsers(users);
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
}