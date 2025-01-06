/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { StatusCodes } from 'http-status-codes';
import { Tblog } from './blog.interface';
import { blogService } from './blog.service';

//Method: POST

// const createBlog = async (req: Request, res: Response) => {
// const payload = req.body;
// const result = await blogService.creatblog(payload);
// console.log('test', req.user);
// try {
// const { user } = req;
// if (!user) {
// return res.status(401).json({
// message: 'User not authenticated',
// });
// }
//
// const { email, role } = user;
//
// res.status(201).json({
// success: true,
// message: 'Blog created successfully',
// statusCode: 201,
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
//

const createBlog = async (req: Request, res: Response) => {
  const payload = { ...req.body, author: req.user?.id }; // Include author explicitly

  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'User not authenticated',
      });
    }

    const result = await blogService.creatblog(payload);
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      statusCode: StatusCodes.CREATED,
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
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
      statusCode: error.statusCode || 500,
    });
  }
};

//Method: DELETE

const DeleteBlog = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const blogId = req.params.id;

    const result = await blogService.deleteBlog(blogId, userId);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Blog deleted successfully',
        statusCode: 200,
      });
    }

    return res.status(403).json({
      success: false,
      message: 'You are not authorized to delete this blog',
      statusCode: 403,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the blog',
      statusCode: 500,
      error: error.message,
    });
  }
};

//Method: GET  ALL

// const getAllBlogs = async (req: Request, res: Response) => {
// try {
// const blogs: Tblog[] = await blogService.getAllBlogs();

// res.status(200).json({
// success: true,
// message: 'Blogs fetched successfully',
// data: blogs.map((blog) => ({
// _id: blog._id,
// title: blog.title,
// content: blog.content,
// author: req.user ,
// })),
// });
// } catch (error) {
// res.status(500).json({
// success: false,
// message: 'An error occurred while fetching blogs',
// error: error instanceof Error ? error.message : 'Unknown error',
// });
// }
// };
//

// import { Request, Response } from "express";

// async function getBlogs(req: Request, res: Response) {
// try {
// const blogs = await getAllBlogs();
// res.status(200).json({
// success: true,
// message: "Blogs fetched successfully",
// statusCode: 200,
// data: blogs
// });
// } catch (error) {
// res.status(500).json({
// success: false,
// message: error.message,
// statusCode: 500
// });
// }
// }

// import { Request, Response } from 'express';
//
// async function getBlogs(req: Request, res: Response) {
// try {
// const blogs = await blogService.getAllBlogs();
// res.status(200).json({
// success: true,
// message: 'Blogs fetched successfully',
// statusCode: 200,
// data: blogs,
// author: req.user ,
// });
// } catch (error) {
// res.status(500).json({
// success: false,
// message: error.message,
// statusCode: 500,
// });
// }
// }
//

async function getBlogs(req: Request, res: Response) {
  try {
    const blogs = await blogService.getAllBlogs();

    if (!blogs.length) {
      return res.status(404).json({
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
    console.error(error); // Log error to server logs
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const blogController = {
  createBlog,
  updateBlog,
  DeleteBlog,
  getBlogs,
};
