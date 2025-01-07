import { ObjectId } from 'mongoose';

export interface User {
  email: string;
  role: string;
}
export interface Tblog {
  _id: ObjectId;
  title: string;
  email: string;
  role: string;
  content: string;
  author:
    | ObjectId
    | {
        email: string;
        role: string;
      }; // Allow populated author with `email` and `role`
}

export interface SimplifiedBlog {
  _id: string;
  title: string;
  content: string;
  author: {
    email: string;
    role: string;
  };
}
