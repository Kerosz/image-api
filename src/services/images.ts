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

export interface IReturnImage {
  source: string;
  path: string;
}

const INPUT_DIR_PATH = path.resolve(path.join("bucket", "full"));
const OUTPUT_DIR_PATH = path.resolve(path.join("bucket", "thumb"));

export async function getCachedImage(args: IResizeImageParams): Promise<IReturnImage | null> {
  const imagePath = path.join(
    OUTPUT_DIR_PATH,
    `${args.filename}-w${args.width}-h${args.height}-thumb.jpg`
  );
  const imageExists = await doesPathExist(imagePath);

  if (imageExists) {
    return {
      source: "cached",
      path: imagePath,
    };
  }

  return null;
}

export async function resizeImage({
  filename,
  width,
  height,
}: IResizeImageParams): Promise<IReturnImage> {
  if (typeof width === "string") {
    width = Number(width);
  }
  if (typeof height === "string") {
    height = Number(height);
  }

  const inputPath = path.join(INPUT_DIR_PATH, `${filename}.jpg`);
  const outputPath = path.join(OUTPUT_DIR_PATH, `${filename}-w${width}-h${height}-thumb.jpg`);

  const imageBuffer = await readFile(inputPath);

  if (!imageBuffer) throw new Error(`Filename '${filename}' does not exist in the bucket!`);

  const dir = await doesPathExist(OUTPUT_DIR_PATH);

  if (!dir) {
    await makeDir(OUTPUT_DIR_PATH);
  }

  await sharp(imageBuffer).resize(width, height).toFile(outputPath);

  return {
    source: "processed",
    path: outputPath,
  };
}
