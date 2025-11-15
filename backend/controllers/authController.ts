import type { Request, Response } from "express";
import {
  authenticateUser,
  generateToken,
  registerNewUser,
  updatePassword,
  verifyEmailRegistration,
  verifyUser,
} from "../services/authService.ts";
import { getErrorMessage } from "../lib/error.ts";
import { setCookie, generateJwtToken } from "../lib/jwt.ts";
import { log } from "console";
import cypto from "crypto"
import { sendEmail } from "../services/mail.ts";

const signup = async (req: Request, res: Response) => {
  const userData = req.body;
  try {
    const { userCreated, verificationToken } = await registerNewUser(userData);
    sendEmail({
      subject: "Verification Code",
      text: `Please use this verification code : ${verificationToken} to verify your email `,
      to: userData.email,
      from: process.env.NODEMAILER_EMAIL || "example@gmail.com",
    }).catch((err) => log("Error sending verification Email", err));
    await generateJwtToken(userCreated.id).then((token) =>
      setCookie(res, token)
    );
    res
      .status(200)
      .json({
        message: "User Registration successfull, Please verify your email",
        userCreated,
      });
  } catch (err) {
    res
      .status(400)
      .clearCookie("token")
      .json({
        message: "User Registration failed",
        error: getErrorMessage(err),
      });
  }
};

const emailVerification = async (req: Request, res: Response) => {
  const { email, token } = req.body;
  try {
    const userVerified = await verifyEmailRegistration(email, token);
    res
      .status(200)
      .json({ message: "User email verified successfull", userVerified });
  } catch (err) {
    res
      .status(400)
      .json({
        message: "User email verification  failed",
        error: getErrorMessage(err),
      });
  }
};

const logout = async (req: Request, res: Response) => {
  res.clearCookie("token").status(200).send({ message: "Logout successful" });
};

const generateResetLink = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const userExists= await verifyUser(email)
    const resetToken = cypto.randomBytes(17).toString("hex");
    if (userExists) {
     sendEmail({
      subject: "Password reset Link",
      text: `Please use this password reset Link : ${process.env.CLIENT_HOST}/reset-password/${resetToken} to update your password. `,
      to: email,
      from: process.env.NODEMAILER_EMAIL || "example@gmail.com",
    }).catch((err) => log("Error sending verification Email", err));
    userExists.resetPasswordToken = resetToken;
    userExists.resetPasswordExpiresAt = new Date(Date.now() + 1000*60*10);
    await userExists.save();
   
}
 res.status(200).send("reset link generated please check your email.")
  } catch (err) {
    return res.status(400).send("Reset link generation failed !");
  }
};

const verifyUserIdentity = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const userExists= await verifyUser(email)
    if (userExists) {
        const resetToken = cypto.randomBytes(17).toString("hex");
     sendEmail({
      subject: "Password reset Link",
      text: `Please use this password reset Link : ${process.env.CLIENT_HOST}/reset-password/${resetToken} to update your password. `,
      to: email,
      from: process.env.NODEMAILER_EMAIL || "example@gmail.com",
    }).catch((err) => log("Error sending verification Email", err));
    userExists.resetPasswordToken = resetToken;
    userExists.resetPasswordExpiresAt = new Date(Date.now() + 1000*60*10);
    await userExists.save();
    } 
    
    return res.status(200).json({message:"Password reset link has been to sent to the registered email."});
  } catch (err) {
    return res.status(400).send("Invalid token!");
  }
};

 const resetPassword = async (req: Request, res: Response) => {
    const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const updatedUser = await updatePassword( newPassword,"resetPasswordToken",token);
    return res.status(200).send("Password Rest Successful");
  } catch (err) {
    return res.status(400).send("Invalid token!");
  }
};

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  log(email, password);
  try {
    const user = await authenticateUser(email, password);
    const token = await generateJwtToken(user.id);
    setCookie(res, token);
    user.lastLogin = new Date(Date.now());
    user.save();
    res.status(200).json({
      message: "login successful",
    });
  } catch (err) {
   return  res
      .status(400)
      .clearCookie("token")
      .json({
        message: "User login failed",
        error: getErrorMessage(err),
      });
  }
};

const checkAuth = async (req:Request,res:Response) => {
  log("running")
  const { userId }= req.params;
  log(userId)
  try{
    const userExists = await verifyUser(undefined,userId)
    if(!userExists){
      return res.status(400).json({message:"User not found"});
    }
     return res.status(200).json({userExists})
  } catch(err){
    return res.status(400).json({message:"User not found"});
  }

}

export default {
    signup,
    signin,
    emailVerification,
    logout,
    verifyUserIdentity,
    resetPassword,
    generateResetLink,
    checkAuth
}