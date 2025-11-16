import { Router } from "express";
import controllers from "../controllers/authController.ts";
import validateRequestBody from "../middleware/requestBodyValidation.ts";
import { UserRegistration, emailVerification, resetPassword, userLogin } from "../types/User.ts";
import authenticateUser from "../middleware/authenticateUser.ts";

const authRouter = Router();

authRouter.post("/signup", validateRequestBody(UserRegistration) ,controllers.signup)
authRouter.post("/verify-email", validateRequestBody(emailVerification) ,controllers.emailVerification)
authRouter.post("/logout", controllers.logout)
authRouter.post("/login", validateRequestBody(userLogin) ,controllers.signin)
authRouter.post("/generate-reset-link",  validateRequestBody(resetPassword), controllers.generateResetLink)
authRouter.post("/verify-identity",  validateRequestBody(resetPassword), controllers.verifyUserIdentity)
authRouter.post("/reset-password/:token",controllers.resetPassword)
authRouter.get("/check-auth",authenticateUser,controllers.checkAuth)


export default authRouter;