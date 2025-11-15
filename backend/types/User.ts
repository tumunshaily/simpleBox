import { z } from "zod";

export type UserData = {
    email:string,
    passwordHash:string,
    name:string,
    lastLogin?: number,
    isVerified?:boolean,
    resetPasswordToken?: string,
    resetPasswordExpiresAt?: number,
    verificationToken?: string,
    verificationTokenExpiresAt?: number
    
};

export type UserOptionalData = {
    email?:string,
    passwordHash?:string,
    name?:string,
    lastLogin?: number,
    isVerified?:boolean,
    resetPasswordToken?: string | null,
    resetPasswordExpiresAt?: number | null,
    verificationToken?: string | null,
    verificationTokenExpiresAt?: number | null
    
};

export const UserRegistration = z.object({
    email:z.email(),
    name:z.string(),
    password:z.string().min(5,"Password must be of 5 length")
}).strict();

export const emailVerification = z.object({
    email:z.email(),
    token:z.string().min(6).max(6)
}).strict();

export const userLogin = z.object({
       email:z.email(),
    password:z.string().min(5,"Password must be of 5 length")
}).strict();

export const resetPassword = z.object({
       email:z.email(),
    password:z.string().min(5,"Password must be of 5 length").optional()
});

export type UserRegistration = z.infer<typeof UserRegistration>;

