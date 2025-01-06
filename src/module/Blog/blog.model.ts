import { Tblog } from './blog.interface';

import mongoose, { Schema } from 'mongoose';

const blogSchema = new Schema<Tblog>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },

  // isPublished: {
  // type: Boolean,
  // default: true,
  // },
});

//  {
// timestamps: true, // Automatically adds createdAt and updatedAt fields
//
// })

export const blog = mongoose.model<Tblog>('blog', blogSchema);
export default blogSchema;
