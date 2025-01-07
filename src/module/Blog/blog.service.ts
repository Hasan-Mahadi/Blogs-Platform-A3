/* eslint-disable @typescript-eslint/no-explicit-any */

import { Tblog } from './blog.interface';
import { blog } from './blog.model';

// For POST

const creatblog = async (payload: Tblog): Promise<Tblog> => {
  const result = await blog.create(payload);
  return result;
};

// For PATCH

const updateBlog = async (blogId: any, userId: any, updateData: any) => {
  // Find the blog by ID
  const Blog = await blog.findById(blogId);

  if (!Blog) {
    const error = new Error('Blog not found');
    error.statusCode = 404;
    throw error;
  }

  // Check if the logged-in user is the author
  if (Blog.author !== userId) {
    const error = new Error('Unauthorized to update this blog');
    error.statusCode = 403;
    throw error;
  }

  // Update the blog
  Object.assign(Blog, updateData);
  const updatedBlog = await Blog.save();

  return updatedBlog;
};

//For Delete

const deleteBlog = async (
  blogId: string,
  userId: string,
): Promise<{ success: boolean }> => {
  try {
    const Blog = await blog.findById(blogId);

    if (!Blog) {
      throw new Error('Blog not found');
    }

    if (Blog.author !== userId) {
      return { success: false };
    }

    await blog.findByIdAndDelete(blogId);
    return { success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

// for GET ALL

// const getAllBlogs = async () => {
//
// const Blogs = await blog.find().populate('author', 'name email');
// return Blogs;
// };

//
//

// const  getAllBlogs = async( query: Record<string, any>={}) => {
//
// console.log(query);
//
// try {
//  const search = query?.search || '';
//
//
// const blogs = await blog.find({$or:[
// {title: {regex:search, $options: "i"}},
// {content: {regex:search, $options: "i"}}
// { title: { $regex: new RegExp(search, 'i') } },
// { content: { $regex: new RegExp(search, 'i') } },
//

//  const searchableFields = ["title", "content"]
//
//
//
// // const blogs = await blog.find({$or: searchableFields.map((field)=> ({[field]: { $regex: new RegExp(search, 'i')}}) )})
// .populate('author', 'email role');
// return blogs.map((blog) => ({
// _id: blog._id,
// title: blog.title,
// content: blog.content,
// author: {
// email: blog.author,
// role: blog.author,
// },
// }));
// } catch (error) {
// throw new Error('Error fetching blogs: ' + error.message);
// }
// }
//
// export const blogService = {
// creatblog,
// updateBlog,
// deleteBlog,
// getAllBlogs,
// };
//

const getAllBlogs = async (query = {}) => {
  console.log(query);
  try {
    const {
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'asc',
      filter,
    } = query;

    // Search functionality
    const searchableFields = ['title', 'content'];
    const searchCondition = searchableFields.map((field) => ({
      [field]: { $regex: new RegExp(search, 'i') },
    }));

    // Filter functionality
    const filterCondition = filter ? { author: filter } : {};

    // Combine search and filter conditions
    const conditions = {
      $and: [{ $or: searchCondition }, filterCondition],
    };

    // Sorting functionality
    const sortCondition = {
      [sortBy]: sortOrder === 'desc' ? -1 : 1,
    };

    // Fetch blogs with conditions, sorting, and population
    const blogs = await blog
      .find(conditions)
      .sort(sortCondition)
      .populate('author', 'email role');

    // Map the results to the desired format
    return blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      author: {
        email: blog.author,
        role: blog.author,
      },
    }));
  } catch (error) {
    throw new Error('Error fetching blogs: ' + error.message);
  }
};

export const blogService = {
  creatblog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
