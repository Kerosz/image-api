// packages
import path from "path";
import sharp from "sharp";
// internals
import { doesPathExist, makeDir, readFile } from "../utils/file-system";

export interface IResizeImageParams {
  filename: string;
  width: string | number;
  height: string | number;
}

const INPUT_DIR_PATH = path.resolve(path.join("bucket", "full"));
const OUTPUT_DIR_PATH = path.resolve(path.join("bucket", "thumb"));

export async function resizeImage({
  filename,
  width,
  height,
}: IResizeImageParams): Promise<string> {
  if (typeof width === "string") {
    width = Number(width);
  }
  if (typeof height === "string") {
    height = Number(height);
  }

  const inputPath = path.join(INPUT_DIR_PATH, `${filename}.jpg`);
  const outputPath = path.join(OUTPUT_DIR_PATH, `${filename}-w${width}-h${height}-thumb.jpg`);

  /**
   * Checks to see if the output path already exists and returns it, otherwise it processes the image
   * Could be improved with a Redis cache
   */
  const imageExists = await doesPathExist(outputPath);

  if (imageExists) {
    console.info(`Cached: ${outputPath}`);

    return outputPath;
  } else {
    const imageBuffer = await readFile(inputPath);

    if (imageBuffer) {
      const dir = await doesPathExist(OUTPUT_DIR_PATH);

      if (!dir) {
        await makeDir(OUTPUT_DIR_PATH);
      }

      await sharp(imageBuffer).resize(width, height).toFile(outputPath);
    }

    return outputPath;
  }
}
