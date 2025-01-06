import { TUser } from './user.interface';
import { User } from './user.model';

// Method:POST
const createUser = async (payload: TUser): Promise<TUser> => {
  const result = await User.create(payload);
  return result;
};

// get User

const getUser = async () => {
  const result = await User.find();
  return result;
};

// Method:PATCH

const blockUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.StatusCode = 404;
    throw error;
  }

  if (user.isBlocked) {
    const error = new Error('User is already blocked');
    error.statusCode = 400;
    throw error;
  }

  user.isBlocked = true;
  await user.save();
  return user;
};

export const userService = {
  createUser,
  blockUserById,
  getUser,
};
