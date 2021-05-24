import { Router, Request, Response } from "express";
import imagesRouter from "./api/images";

const router = Router();

router.get("/", (_req: Request, res: Response) => res.send("main route"));

router.use("/images", imagesRouter);

export default router;
