import type { UserData, UserOptionalData } from "../types/User.ts";
import User from "../dao/models/Users.ts";
import { log } from "console";
 
export const createNewUser = async (userData: UserData) => {
    log(userData);
    const userExits = await User.findOne({email:userData.email});
    log(userExits);
    if(!userExits){
        const updatedUser = await User.create({
            ...userData,
            isVerified: false,
            resetPasswordToken: undefined,
            resetPasswordExpiresAt: undefined,
            lastLogin:Date.now(),
        });
        updatedUser.save();
        return {...updatedUser, passwordHash:undefined};
    }
    throw new Error("User Exists!");

}


export const getUser = async (email?: string, userId?:string,externalField?: string, externalValue?: string) => {
    let query: any = {};
    
    if (email) {
        query = { email };
    } else if (externalField && externalValue) {
        query = { [externalField]: externalValue };
    }
    
    const user = userId ? await User.findById(userId).select("-passwordHash"): await User.findOne(query);
    
    if (!user) {
        throw new Error("User doesn't exist");
    }
    
    return user;
}


export const updateUser = async(userId:string,userData: UserOptionalData) => {
    const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: userData }, 
    { new: true, runValidators: true } 
        ).select("-passwordHash");

    if(!updatedUser){
        throw new Error("User doesn't exits");
    }
    return updatedUser;
}