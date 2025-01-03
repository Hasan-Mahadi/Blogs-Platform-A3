import { Tblog } from "./blog.interface";
import { blog } from "./blog.model";




const creatblog = async(payload:Tblog):Promise<Tblog>=>{
    const result = await blog.create(payload)
    return result;
}

export const blogService ={
    creatblog,
}












































