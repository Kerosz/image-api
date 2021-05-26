// packages
import path from "path";
import mock from "mock-fs";
// internals
import { getCachedImage, resizeImage } from "../../services/images";
// types
import type { IResizeImageParams } from "../../services/images";

describe("Image Service", function () {
  beforeAll(() => {
    mock({
      bucket: {
        full: {
          "spacex.jpg": mock.load(path.resolve(path.join("bucket", "full", "spacex.jpg"))),
          "dam.jpg": Buffer.from([8, 6, 7, 5, 3, 0, 9]),
        },
        thumb: {
          "dam-w200-h200-thumb.jpg": Buffer.from([8, 6, 7, 5, 3, 0, 9]),
        },
      },
    });
  });

  afterAll(() => mock.restore());

  describe("resizeImage func", function () {
    it("should return an object with the source and path of the processed image", async function () {
      const args: IResizeImageParams = {
        filename: "spacex",
        width: 100,
        height: 100,
      };
      const imagePath = path.resolve(path.join("bucket", "thumb", "spacex-w100-h100-thumb.jpg"));

      const result = await resizeImage(args);
      const expectedResult = {
        source: "processed",
        path: imagePath,
      };

      expect(result).toEqual(expectedResult);
    });

    it("should throw an error if the filename does not exist", async function () {
      const args: IResizeImageParams = {
        filename: "not-found",
        width: 100,
        height: 100,
      };
      const errorMessage = `Filename 'not-found' does not exist in the bucket!`;

      await expectAsync(resizeImage(args)).toBeRejectedWithError(errorMessage);
    });
  });

  describe("getCacheImage func", function () {
    it("should return an object with the path of the cached image if it exists", async function () {
      const args: IResizeImageParams = {
        filename: "dam",
        width: 200,
        height: 200,
      };
      const imagePath = path.resolve(path.join("bucket", "thumb", "dam-w200-h200-thumb.jpg"));

      const result = await getCachedImage(args);
      const expectedResult = {
        source: "cached",
        path: imagePath,
      };

      expect(result).toEqual(expectedResult);
    });

    it("should return undefined if the image does not exist in the cache", async function () {
      const args: IResizeImageParams = {
        filename: "dam",
        width: 400,
        height: 400,
      };

      const result = await getCachedImage(args);

      expect(result).toBeUndefined();
    });
  });
});
