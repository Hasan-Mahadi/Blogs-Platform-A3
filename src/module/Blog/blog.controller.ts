/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { blogService } from './blog.service';
import { Tblog } from './blog.interface';

//Method: POST

const createBlog = async (req: Request, res: Response): Promise<void> => {
  const payload = req.body;
  const result = await blogService.creatblog(payload);
  console.log('test', req.user);
  try {
    const { user } = req;
    if (!user) {
      res.status(401).json({
        message: 'User not authenticated',
      });
    }

    const { email, role } = user;

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      statusCode: 201,
      data: {
        _id: result._id,
        title: result.title,
        content: result.content,
        author: req.user,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const createBlog = async  (req: Request, res: Response) => {
// // const payload = { ...req.body, author: req.user?.id }; // Include author explicitly
//
// try {
// if (!req.user) {
// return res.status(401).json({
// message: 'User not authenticated',
// });
// }
//
// const result = await blogService.creatblog(payload);
// res.status(201).json({
// success: true,
// message: 'Blog created successfully',
// statusCode: StatusCodes.CREATED,
// data: {
// _id: result._id,
// title: result.title,
// content: result.content,
// author: req.user,
// },
// });
// } catch (error) {
// console.error(error);
// res.status(500).json({ message: 'Internal server error' });
// }
// };

//Method: PATCH

const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;
    const { title, content } = req.body;

    const updatedBlog = await blogService.updateBlog(blogId, userId, {
      title,
      content,
    });

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      statusCode: 200,
      data: {
        _id: updatedBlog._id,
        title: updatedBlog.title,
        content: updatedBlog.content,
        author: req.user,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
};

//Method: DELETE

const DeleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user.id;
    const blogId = req.params.id;

    const result = await blogService.deleteBlog(blogId, userId);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Blog deleted successfully',
        statusCode: 200,
      });
    }

    res.status(403).json({
      success: false,
      message: 'You are not authorized to delete this blog',
      statusCode: 403,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
};

//get all blogs

// interface BlogQueryParams {
// search?: string;
// sortBy?: string;
// sortOrder?: 'asc' | 'desc';
// filter?: string;
// }
//Request<>
const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await blogService.getAllBlogs(req.query);

    if (!blogs.length) {
      res.status(404).json({
        success: false,
        message: 'No blogs found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Blogs fetched successfully',
      statusCode: StatusCodes.OK,
      data: blogs,
      author: req.user,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
};

export const blogController = {
  createBlog,
  updateBlog,
  DeleteBlog,
  getBlogs,
};
