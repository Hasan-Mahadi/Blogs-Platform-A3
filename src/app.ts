
import express, { Application, } from 'express';
import { Request, Response, } from 'express';
import cors from 'cors';
import authRoute from './module/auth/auth.route';
import userRouter from './module/User/user.route';
import blogRouter from './module/Blog/blog.router';
import  globalErrorHandler  from './middlewares/globalErrorHandler';




const app: Application = express();
// const port = 3000;
// 
//parsers

app.use(express.json());
app.use(cors());




app.use('/api/blogs', blogRouter);

app.use('/api/auth', authRoute );


app.use('/api/user', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Assalamoyalaikom');
});


// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, no-unused-vars

 app.use(globalErrorHandler);

app.use("*", (req:Request, res: Response)=>{
  res.status(404).json({
    status: false,
    message: 'Route not found'
  })
})


export default app;


