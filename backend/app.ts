import express from 'express';
import dotenv from "dotenv";
import dbConnect from './lib/db.ts';

// Load environment variables from .env file
dotenv.config();

const app = express();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
    dbConnect();
})
