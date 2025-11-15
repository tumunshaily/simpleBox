import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

export const s3 = new S3Client({
  region: process.env.E2_REGION ?? "us-east-1",
  endpoint: process.env.E2_ENDPOINT,    // IDrive E2 endpoint
  credentials: {
    accessKeyId: process.env.E2_ACCESS_KEY!,
    secretAccessKey: process.env.E2_SECRET_KEY!,
  },
  forcePathStyle: false, // E2 supports virtual-hosted style
});