// packages
import { Router } from "express";
// internals
import imagesController from "../../controllers/images-controller";
import useAsync from "../../middleware/use-async";
import { verifyResizeQuery } from "../../middleware/verify";

const images = Router();

images.get("/", verifyResizeQuery, useAsync(imagesController.resize));

export default images;
