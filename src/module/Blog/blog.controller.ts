/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { blogService } from "./blog.service";




const createBlog = async (req:Request, res:Response) => {
     const payload = req.body;
 const result = await blogService.creatblog(payload)
     console.log('test', req.user);
  try {
    const { user } = req; // Extract user from the request object
    if (!user) {
      return res.status(401).json({
         message: 'User not authenticated',
         });
    }

    const { email, role } = user; // Access specific properties from the user
   
    res.status(201).json({
      
  success: true,
  message: 'Blog created successfully',
  statusCode: 201,
  data: {
    _id: result._id, // assuming result contains the blog ID
    title: result.title, // assuming result contains the blog title
    content: result.content, // assuming result contains the blog content
    author: req.user // assuming req.user contains author details
  }
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
};
 export const blogController ={
     createBlog,
 }