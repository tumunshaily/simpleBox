import express from 'express';
import dotenv from "dotenv";
import dbConnect from './lib/db.ts';
import routes from "./routes/index.ts"
import cookieParser from "cookie-parser"
import cors from "cors"
// import { sendEmail  } from './services/mail.ts';

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_HOST || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());
app.use(cookieParser());

app.use("/auth",routes.authRouter)
app.use("/dashboard",routes.dashboardRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
    dbConnect();
    // sendEmail({subject: "Test",text: "I am sending an asdad email from nodemailer!",to: "iiitkchodumeme@gmail.com",from: process.env.NODEMAILER_EMAIL!});
});
