import type { Request, Response } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../lib/s3client.ts"

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ListObjectsV2Command, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const BUCKET = process.env.IDRIVE_BUCKET!;

 const uploadUrl = async (req:Request, res: Response) => {
  const { fileName, fileType } = req.body;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: fileName,
    ContentType: fileType,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 60 }); // 1 minute

  res.json({
    uploadUrl: url,
    key: fileName,
  });
}

const listFiles = async (req:Request, res: Response) => {
  const list = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET }));
  res.json(list.Contents ?? []);
}

const deleteFile = async (req:Request, res: Response) => {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: req.params.key,
    })
  );
  res.json({ success: true });
}

const viewDownloadFile =  async (req:Request, res: Response) => {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: req.params.key,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 60 });

  res.redirect(url);
}

export default {
    deleteFile,
    listFiles,
    uploadUrl,
    viewDownloadFile 
}