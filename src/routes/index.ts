// packages
import { Router } from "express";
// internals
import imagesRouter from "./api/images-router";
// types
import type { Response, Request } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => res.redirect("/api/v1/images"));

router.use("/images", imagesRouter);

export default router;
