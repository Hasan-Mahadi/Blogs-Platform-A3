import jwt, { JwtPayload } from 'jsonwebtoken';

import AppError from "../app/errors/AppError";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";


const httpStatus = {
  OK: 200,
  NOT_FOUND: 404,
  UNAUTHORIZED:401,
  INTERNAL_SERVER_ERROR: 500,
};


const auth = ()=>{
    return catchAsync(async(req: Request, res: Response, next:NextFunction) => {
       const token = req.headers.authorization;
    //    console.log(token);

  // if the token is sent from the client side 

     if(!token){
  
        throw new AppError(httpStatus.UNAUTHORIZED,'You are not authorized!');
     };

     //cheak if the  token is unvalid or wrong
         
     jwt.verify(token, 'secret', function (err, decoded) {

        if(err){
             throw new AppError(httpStatus.UNAUTHORIZED,'You are not authorized!(Invalid Token)');
        };
          // console.log(decoded)
       // decoded undefined
        // const {email, role} = decoded;

        req.user = decoded as JwtPayload;
          next();
      

     });

        
        
    });
  
   
}


export default auth;