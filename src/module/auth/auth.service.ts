import bcrypt from 'bcrypt';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';

const register = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new Error('User not found!!');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new Error('password is not Correct');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  // const token = jwt.sign({email:user?.email, role: user?.role}, "secret", {expiresIn: "30d"});
  const token = jwt.sign({ jwtPayload }, 'secret', { expiresIn: '30d' });

  const verifiedUser = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };

  return { token, verifiedUser };
};

export const AuthService = {
  register,
  login,
};
