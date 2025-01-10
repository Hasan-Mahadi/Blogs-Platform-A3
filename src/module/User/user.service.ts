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

export const userService = {
  createUser,
  getUser,
};
