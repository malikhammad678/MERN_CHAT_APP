import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
});

const userSocketMap = {};

export const getRecieverSocketId = (recieverId) => {
    return userSocketMap[recieverId];
};

io.on('connection', (socket) => {
    console.log("User connected:", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    socket.on('disconnect', () => {
        console.log("User disconnected:", socket.id);
        const userId = Object.keys(userSocketMap).find(id => userSocketMap[id] === socket.id);
        if (userId) {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

export { app, io, server };
