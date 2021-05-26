import mock from "mock-fs";
import path from "path";
import { doesPathExist, makeDir, readFile } from "../../utils/file-system";

describe("File System Utils", function () {
  beforeAll(() => {
    mock({
      bucket: {
        full: {
          "spacex.jpg": Buffer.from([8, 6, 7, 5, 3, 0, 9]),
        },
      },
    });
  });

  afterAll(() => mock.restore());

  describe("readFile func", function () {
    it("should read a file and return a buffer", async function () {
      const filePath = path.resolve(path.join("bucket", "full", "spacex.jpg"));

      const result = await readFile(filePath);
      const expectedResult = Buffer.from([8, 6, 7, 5, 3, 0, 9]);

      expect(result).toEqual(expectedResult);
    });

    it("should return undefined and log a console message when file does not exist", async function () {
      const filePath = path.resolve(path.join("bucket", "full", "not-found.jpg"));

      const result = await readFile(filePath);

      expect(result).toBeUndefined();
    });
  });

  describe("doesPathExist func", function () {
    it("should return true if the given path exists", async function () {
      const filePath = path.resolve(path.join("bucket", "full", "spacex.jpg"));

      const result = await doesPathExist(filePath);

      expect(result).toBe(true);
    });

    it("should return false if path does not exist", async function () {
      const filePath = path.resolve(path.join("bucket", "full", "not-found"));

      const result = await doesPathExist(filePath);

      expect(result).toBe(false);
    });
  });

  describe("makeDir func", function () {
    it("should return a message with the path if successfully created", async function () {
      const dirPath = path.resolve(path.join("bucket", "thumb"));

      const result = await makeDir(dirPath);
      const expectedResult = `Directory created at ${dirPath}!`;

      expect(result).toBe(expectedResult);
    });
  });
});
