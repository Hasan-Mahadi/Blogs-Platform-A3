/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AuthService.register(req.body);

      sendResponse(res, {
        success: true,
        message: 'User registered successfully',
        statusCode: StatusCodes.CREATED,
        data: {
          _id: result.id,
          name: result.name,
          email: result.email,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials',
          statusCode: 401,
          error: error.message, // Send the error message instead of the entire error object
          stack: error.stack, // Access the stack safely
        });
      }
    }
  },
);

//login

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await AuthService.login(req.body);

      sendResponse(res, {
        success: true,
        message: 'Login successful',
        statusCode: StatusCodes.OK,
        data: {
          token: result.token,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials',
          statusCode: 401,
          error: error.message, // Send the error message instead of the entire error object
          stack: error.stack, // Access the stack safely
        });
      }
    }
  },
);

export const AuthController = {
  register,
  login,
};
