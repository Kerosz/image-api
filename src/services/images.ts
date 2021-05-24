export function processImage(filename: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(filename + " processed"), 2000);
  });
}
