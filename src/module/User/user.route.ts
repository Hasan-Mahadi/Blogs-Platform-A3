import { Router } from "express";
import { UserController } from "./user.controller";


const userRouter = Router()

userRouter.post('/create-user', UserController.creatUser)


export default userRouter;