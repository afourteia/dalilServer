const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const UserRole = require("../schemas/userRoleSchema");

beforeEach(async () => {
  const connectDB = require("../config/database");
  await connectDB();
});

afterEach(async () => {
  await mongoose.connection.close();
});
describe("Sample Test", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
});

describe("Users Post Endpoints", () => {
  const todo = {
    name: "doctor",
    apiPrivilages: ["/user"],
  };
  test("Should create a new UserRole", async () => {
    const mockCreateUserRole = jest.fn(() => todo);
    jest
      .spyOn(UserRole, "create")
      .mockImplementation(() => mockCreateUserRole());

    const res = await request(app)
      .post("/v1/roles")
      .set({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VkZWQxOTJiMzQ2YzU3ODcyZTlhODgiLCJ1c2VybmFtZSI6ImFkbWluIiwiaGFzaGVkUGFzc3dvcmQiOiIkMmIkMTAkTGp3c2lBMW40Zk83VGR2QmJxY3V6ZThFNDFETWZWY3NKY1FZT2kuZzNuVEJWLlU3ZS9qUC4iLCJpYXQiOjE2Nzc1ODY3OTUsImV4cCI6MTY4MDE3ODc5NX0.OayAkrZa9_8kScRtOO4YTfSU7ijtl9NgqQudb2meNTg",
      })
      .send({
        name: "doctor",
        apiPrivilages: ["/users"],
      });
    expect(res.status).toEqual(200);
    // expect(res.body).toHaveProperty("post");
  });
});

describe("Get Endpoints", () => {
  test("Should get list of user roles", async () => {
    const res = await request(app).get("/v1/roles");
    expect(res.status).toEqual(200);
    expect(res.body.roles.length).toBeGreaterThan(0);
  });
});
