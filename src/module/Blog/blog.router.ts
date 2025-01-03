import { Router } from "express";
import { blogController } from "./blog.controller";
import auth from "../../middlewares/auth";




const blogRouter = Router();


blogRouter.post('/',auth(), blogController.createBlog)



export default blogRouter;






