// packages
import request from "supertest";
// internals
import app from "../../index";

describe("Image Router", function () {
  it("GET /images?filename=spacex&width=200&height=200 -> should return processed image", async function () {
    const res = await request(app)
      .get("/api/v1/images")
      .query({ filename: "spacex", width: 200, height: 200 });

    expect(res.status).toBe(200);
    expect(res.type).toBe("image/jpeg");
  });
});
