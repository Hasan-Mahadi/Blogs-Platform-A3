import { TUser } from "./user.interface"
import { User } from "./user.model"

const createUser = async (payload: TUser): Promise<TUser>=>{
     const result = await User.create(payload)
     return result

}

export const userService ={
    createUser,
}