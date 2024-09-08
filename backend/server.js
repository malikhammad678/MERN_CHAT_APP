import express from 'express';
import authRouter from './Routes/authroute.js';
import connectToMongoDb from './db/config.js';
import dotenv from 'dotenv';
import messageRouter from './Routes/messageroute.js'; 
import cookieParser from 'cookie-parser';
import userRouter from './Routes/userroute.js';
import { Buffer } from 'buffer';
import { server,app } from './socket/socket.js';


app.use(express.json());
dotenv.config();

global.Buffer = Buffer;


const PORT = process.env.PORT || 5000;



app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/users', userRouter);


server.listen(PORT, async () => {
    try {
        await connectToMongoDb();
        console.log(`APP started on port ${PORT}`);
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
});
