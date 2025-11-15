import jwt from "jsonwebtoken";
import type { Response } from "express";

export const generateJwtToken = async (userId:string) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY || "randomKEY",{
        expiresIn:"7d"
    });
    return token;
}

export const setCookie = (res: Response, token:string ) => {
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.CURR_ENV == "PROD",
        sameSite:"strict",
        maxAge:1000*60*60*24*7

    })

}