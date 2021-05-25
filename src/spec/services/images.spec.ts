// packages
import path from "path";
import mock from "mock-fs";
// internals
import { IResizeImageParams, resizeImage } from "../../services/images";

describe("Image Service", function () {
  describe("resizeImage func", function () {
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

    it("should return a cached path if the image has been already processed", async function () {
      const args: IResizeImageParams = {
        filename: "dam",
        width: 200,
        height: 200,
      };
      const imagePath = path.resolve(path.join("bucket", "thumb", "dam-w200-h200-thumb.jpg"));

      const result = await resizeImage(args);
      const expectedResult = {
        source: "cached",
        path: imagePath,
      };

      expect(result).toEqual(expectedResult);
    });
  });
});
