/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable no-undef */
import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { TUser } from "../User/user.interface";





const register = catchAsync( async ( req: Request, res:Response, next: NextFunction) => {
     try {
    const result = await AuthService.register(req.body);


    sendResponse(res,{
         success: true,
         message: 'User registered successfully',
        statusCode: StatusCodes.CREATED,
         data:{
             _id: result.id,
            name: result.name,
            email: result.email,
           
         },
 })
  } catch (error) {
     res.status(400).json({
      success: false,
      message: 'Validation error',
     statusCode: 400,
        error: error.message,
      stack: error.stack,
    });
    


  }
  });





//login

const login = catchAsync( async ( req: Request, res:Response, next:NextFunction) => {
     try {
    const result = await AuthService.login(req.body);


    sendResponse(res,{
         success: true,
         message: 'Login successful',
        statusCode: StatusCodes.OK,
         data:{
           
           token: result.token,
           
           
         },
 });
  } catch (error) {
      res.status(401).json({
   success: false,
   message: 'Invalid credentials',
  statusCode: 401,
     error: error.message,
   stack: error.stack,
 });
 
    

   
 }
 });


export const AuthController = {
    register,
    login
}






// function next(error: unknown) {
    // throw new Error("Function not implemented.");
// }
// function next(error: unknown) {
    // throw new Error("Function not implemented.");
// }
// 