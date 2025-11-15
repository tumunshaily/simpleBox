import type { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';





const validateRequestBody = (schema: z.ZodObject<any,any>) => {
    return (req: Request,res:Response,next: NextFunction) => {
        try{
            schema.parse(req.body);
            next();
        }
        catch ( error){
            if(error instanceof ZodError){
                res.status(400).send({message: "Invalid data",error: error.message})
            } else {
                 res.status(400).send({message: "unable to deserialze the request body", error})
            }
        }
    }


}

export default validateRequestBody;