import type { Request, Response, NextFunction } from 'express';
import jwt, {type JwtPayload} from "jsonwebtoken";


const authenticateUser = (req:Request,res:Response,next:NextFunction) => {
    const token = req.cookies?.token;
    try{
        if(!token) return res.status(401).json({message:"Unauthorized - no token exists"});
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || "Tumun shaily 23");

        
        if (typeof decodedToken !== 'object' || decodedToken === null || !('userId' in decodedToken)) {
            return res.status(401).json({message:"Unauthorized - invalid token !"});
        }

        const userId = String((decodedToken as JwtPayload & { userId?: string }).userId);

        req.params.userId = userId;
        
        next();
    }
    catch ( error){
        res.status(401).send({message: "Unauthorized - invalid token"});
    }


}

export default authenticateUser;