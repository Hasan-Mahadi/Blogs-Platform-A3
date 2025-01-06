import { Router } from 'express';
import { blogController } from './blog.controller';
import auth from '../../middlewares/auth';

const blogRouter = Router();

blogRouter.post('/', auth(), blogController.createBlog);
blogRouter.patch('/:id', auth(), blogController.updateBlog);
blogRouter.delete('/:id', auth(), blogController.DeleteBlog);
blogRouter.get('/', auth(), blogController.getBlogs);

export default blogRouter;
