import { Router } from 'express';
import { UserController } from './user.controller';

const userRouter = Router();

userRouter.post('/create-user', UserController.creatUser);

userRouter.get('/', UserController.getUser);

export default userRouter;
