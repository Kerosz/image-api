import { Router, Request, Response } from "express";
// services
import { processImage } from "../../services/images";

const images = Router();

images.get("/", async (req: Request, res: Response) => {
  const params = req.query;

  if (params.filename) {
    await processImage(params.filename as string);

    res.status(200).send("done");
  } else {
    res.status(400).send("Must pass in a filename");
  }
});

export default images;
