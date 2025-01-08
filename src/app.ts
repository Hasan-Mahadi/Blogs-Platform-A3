import  jwt  from 'jsonwebtoken';
import express, { Application } from 'express';
import { Request, Response } from 'express';
import cors from 'cors';
import authRoute from './module/auth/auth.route';
import userRouter from './module/User/user.route';
import blogRouter from './module/Blog/blog.router';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app: Application = express();
// const port = 3000;
//
//parsers

app.use(express.json());
app.use(cors());

app.use('/api/admin/users', userRouter);

app.use('/api/blogs', blogRouter);

app.use('/api/auth', authRoute);

app.use('/api/user', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Assalamoyalaikom');
});

app.use((req, res, next) => {
  // Example: Attach user from a decoded JWT
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  }
  next();
});

app.use(globalErrorHandler);

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found',
  });
});

export default app;
