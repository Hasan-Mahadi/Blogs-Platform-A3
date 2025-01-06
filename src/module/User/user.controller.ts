import { Request, Response } from 'express';

import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

// Method:POST
const creatUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userService.createUser(payload);

  // res.json({
  // status: true,
  //  message: 'User created Successfully',
  //  data: result,
  //  })
  sendResponse(res, {
    message: 'User created Successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
    success: false,
  });
});

// get user

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser();

    res.send({
      status: true,
      message: 'getting user Successfully',
      result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Something went wrong',
      error,
    });
  }
};

// Method:PATCH

const blockUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await userService.blockUserById(userId);
    return sendResponse(res, {
      message: 'User blocked successfully',
      statusCode: StatusCodes.OK,
      data: '',
      success: false,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Validation error',
      statusCode: 400,
      error: error.message,
      stack: error.stack,
    });
  }
};

export const UserController = {
  creatUser,
  getUser,
  blockUser,
};
