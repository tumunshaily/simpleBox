import { Router } from "express";
import controllers from "../controllers/iDriveController";



const dashboardRouter = Router();

dashboardRouter.post("/upload/presign",controllers.uploadUrl );

dashboardRouter.get("/list-files", controllers.listFiles);

dashboardRouter.delete("/del/:key", controllers.deleteFile);

dashboardRouter.get("/view/:key",controllers.viewDownloadFile);

export default dashboardRouter;