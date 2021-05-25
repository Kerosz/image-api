import { promises as fs } from "fs";

export async function readFile(path: string): Promise<Buffer | void> {
  try {
    return await fs.readFile(path);
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

export async function makeDir(path: string): Promise<void> {
  try {
    await fs.mkdir(path, { recursive: true });

    console.info(`Directory created at ${path}!`);
  } catch (error) {
    console.error(`Got an error trying to make directory: ${error.message}`);
  }
}

export async function doesPathExist(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    console.error(`Path '${path}' does not exist!`);
    return false;
  }
}
