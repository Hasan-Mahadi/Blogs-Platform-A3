/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Tblog } from './blog.interface';
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

async function getAllBlogs() {
  try {
    const blogs = await blog.find().populate('author', 'email role');
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
}

export const blogService = {
  creatblog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
