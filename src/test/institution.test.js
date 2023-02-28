const request = require("supertest");
const mongoose = require("mongoose");
const Institution = require("../schemas/institutionSchema");
const app = require("../app");

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

describe("Should create an institution", () => {
  const todo = {
    name: "test 23",
  };
  test("Should create a new institution", async () => {
    const mockCreateInstitution = jest.fn(() => todo);
    jest
      .spyOn(Institution, "create")
      .mockImplementation(() => mockCreateInstitution());

    const res = await request(app).post("/v1/institutions").send({
      name: "test23",
      cityHQ: "test is cool",
    });
    expect(res.status).toEqual(200);
    // expect(res.body).toHaveProperty("post");
  });
});

describe("Should get all institutions", () => {
  test("Should get list of institution", async () => {
    const res = await request(app).get("/v1/institutions");
    expect(res.status).toEqual(200);
    expect(res.body.institutions.length).toBeGreaterThan(0);
  });
});
