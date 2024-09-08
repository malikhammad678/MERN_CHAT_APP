import express from 'express';
import { getUsers } from '../controller/usercontroller.js';
import protectedRoute from '../middleware/protectedRoute.js';
const userRouter = express.Router();

userRouter.get("/",protectedRoute,getUsers);

export default userRouter;