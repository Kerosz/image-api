// internals
import { getCachedImage, resizeImage } from "../services/images";
// types
import type { Request, Response } from "express";
import type { IResizeImageParams, IReturnImage } from "../services/images";

async function resize(req: Request, res: Response): Promise<void> {
  const { filename, width, height } = req.query as unknown as IResizeImageParams;

  let output: IReturnImage;

  try {
    const cachedOutput = await getCachedImage({ filename, width, height });

    if (cachedOutput) {
      output = cachedOutput;
    } else {
      output = await resizeImage({ filename, width, height });
    }
  } catch (error: unknown) {
    throw new Error(String(error));
  }

  res.status(200).sendFile(output.path);
}

export default {
  resize,
};
