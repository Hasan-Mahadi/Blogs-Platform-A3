import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import User from '../User/user.model';

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
      res.status(400).json({
        success: false,
        message: 'Validation error',
        statusCode: 400,
        error: error.message,
        stack: error.stack,
      });
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
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        statusCode: 401,
        error: error.message,
        stack: error.stack,
      });
    }
  },
);

// admin login

const adminlogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.send({
        status: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'User not found',
      });
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.send({
        status: false,
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }

    // Check if the user is an admin
    if (user.role !== 'admin') {
      return res.send({
        status: false,
        statusCode: StatusCodes.FORBIDDEN,
        message: 'Access denied. Admins only',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secretKey',
      { expiresIn: '1h' },
    );

    return res.send({
      status: true,
      statusCode: StatusCodes.OK,
      message: 'Login successful',
      data: { token },
    });
  } catch (error) {
    console.error(error);
    return res.send({
      status: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: 'Invalid credentials',
    });
  }
};

export const AuthController = {
  register,
  login,
  adminlogin,
};
