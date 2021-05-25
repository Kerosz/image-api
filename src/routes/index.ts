// packages
import { Router } from "express";
// internals
import imagesRouter from "./api/images";
// types
import type { Response, Request } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => res.send("main route"));

router.use("/images", imagesRouter);

export default router;
