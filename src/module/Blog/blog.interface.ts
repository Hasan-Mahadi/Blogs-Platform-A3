import mongoose from "mongoose"

export type Tblog = {
    title: string,
    content: string,
     author: mongoose.Schema.Types.ObjectId;
   
    isPublished:boolean, // Default: true
}