import { NextFunction, RequestHandler,Request,Response } from "express"


const catchAsync = (func:RequestHandler) =>{

    return (req:Request, res:Response,next:NextFunction)=>{
        Promise.resolve(func(req,res,next)).catch(error => next(error))
    };

};


export default catchAsync

// catchAsync(async(req:Request, res:Response,) =>{
                // 
            // const payload = req.body
        //  const result = await userService.createUser(payload)
       
        // res.json({
            // status: true,
        //  message: 'User created Successfully',
        //  data: result,
        //  })
        // sendResponse(res,
            //  {  message: 'User created Successfully',
                // statusCode:StatusCodes.CREATED,
                // data:result
            //  })
        // 
    //})
    //  
    //  
     
     