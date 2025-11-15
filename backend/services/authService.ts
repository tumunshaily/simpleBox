import { createNewUser, getUser, updateUser } from "../dao/authDao.ts";
import { UserRegistration } from "../types/User.ts";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { log } from "console";


export const registerNewUser = async (userData: UserRegistration) => {
      const passwordHash = await bcrypt.hash(userData.password,10);
      const verificationToken = Math.floor(100000 + Math.random()*900000).toString();
      const userCreated = await createNewUser({email:userData.email,name:userData.name, passwordHash:passwordHash, verificationToken:verificationToken, verificationTokenExpiresAt: Date.now() + 1000*60*10});
      return {userCreated, verificationToken} ;

}

export const generateToken = async (email:string) => {
       const userExits = await getUser(email);
       const token = crypto.randomBytes(17).toString("hex");
       await userExits.updateOne({
            resetPasswordToken:token,
            resetPasswordExpiresAt:Date.now() + 1000*60*50
       })
       await userExits.save();
       return {userExits,token}
}

export const verifyEmailRegistration = async (email:string,token:string) => {
      const userExits = await getUser(email);
      if(userExits.isVerified){
            return userExits;
      }
      const currentDate =  new Date(Date.now());
      if(userExits.verificationTokenExpiresAt && userExits && token == userExits.verificationToken &&   userExits.verificationTokenExpiresAt > currentDate ){
      const updatedUser = await updateUser(userExits.id,{verificationToken:null,isVerified:true,verificationTokenExpiresAt:null});
      return updatedUser;
      } else {
            throw new Error("Invalid token!");

      }
     }
export const verifyUser = async (email?:string,userId?:string) => {
      const userExits = email ? await getUser(email) : await getUser(undefined,userId);
      log(userExits)
      if(!userExits.isVerified){
            throw new Error("Please verify your account first!");
      }
      return userExits;
     }

export const updatePassword = async ( newPassword:string, externalField?: string, externalValue?: string) => {
      log("reading")
      const userExits = await getUser(undefined,undefined,externalField,externalValue);
      log(userExits)
      if(!userExits.isVerified){
            throw new Error("Please verify your account!")
      }
      if(externalValue == userExits.resetPasswordToken &&( userExits.resetPasswordExpiresAt && userExits.resetPasswordExpiresAt > new Date(Date.now()))){
      const passwordHash = await bcrypt.hash(newPassword,10);
      const updatedUser = await updateUser(userExits.id,{ passwordHash:passwordHash,resetPasswordToken:null,resetPasswordExpiresAt:null});
      return updatedUser;
      } else {
            throw new Error("Invalid token!")

      }
     }

export const authenticateUser = async (email:string,password:string) => {
      const userExits = await getUser(email);
      const passwordHash =  userExits.passwordHash
      if(await bcrypt.compare(password, passwordHash)){
            return userExits;
      }
      throw new Error("Invalid credentials")
}