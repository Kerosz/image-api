// packages
import { Router } from "express";
// services
import { resizeImage } from "../../services/images";
// types
import { Request, Response } from "express";

const images = Router();

images.get("/", async (req: Request, res: Response) => {
  const { filename, width, height } = req.query as any;

  if (filename && width && height) {
    const output = await resizeImage({ filename, width, height });

    res.status(200).sendFile(output);
  } else {
    res.status(400).send("Must pass in a filename, width and height!");
  }
});

export default images;
