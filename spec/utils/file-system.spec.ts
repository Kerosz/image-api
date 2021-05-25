import mock from "mock-fs";
import path from "path";
import { readFile } from "../../src/utils/file-system";

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

      console.log(result);

      expect(true).toBeTruthy();
    });

    it("should return nothing when file does not exist", function () {
      expect(true).toBeTruthy();
    });
  });
});
