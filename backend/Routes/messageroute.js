import express from 'express'
import { sendMessage,getMessage } from '../controller/messageController.js';
import protectedRoute from '../middleware/protectedRoute.js';

const messageroute = express.Router();

messageroute.get("/:id",protectedRoute,getMessage);
messageroute.post("/send/:id",protectedRoute,sendMessage);

export default messageroute;