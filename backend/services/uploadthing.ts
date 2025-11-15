// import { createUploadthing, type FileRouter } from "uploadthing/express";
// import { UTApi } from "uploadthing/server";
// const f = createUploadthing();

// const utapi = new UTApi();

// export const uploadRouter = {

//  fileUploader: f({}) // Optional auth middleware
//     .file(["image", "pdf", "text", "video", "blob"])
//     .maxSize("16MB")
//     .onUploadComplete(async ({ metadata, file }) => {
//       console.log("Uploaded:", file);
//       return { url: file.url };
//     }).onUploadComplete((data) => {
//     console.log("upload completed", data);
//   }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof uploadRouter;