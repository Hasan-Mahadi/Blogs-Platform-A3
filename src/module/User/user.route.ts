import { Router } from 'express';
import { UserController } from './user.controller';

const userRouter = Router();

userRouter.post('/create-user', UserController.creatUser);

userRouter.get('/', UserController.getUser);

userRouter.patch('/:userId/block', UserController.blockUser);

export default userRouter;
