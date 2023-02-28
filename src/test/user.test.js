const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../schemas/userSchema");

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

describe("Users Create Endpoints", () => {
  const userData = {
    userId: "12323",
    username: "doctor891",
    phoneNumber: "12938231",
    password: "password",
    userRole: "63f8716cb521ea8e8e1c2ddf",
    beneficiary: {
      hasBeneficiary: true,
      beneficiaryId: "63e61cba30c2d5d208c46933",
    },
    speciality: "eyes",
    gender: "female",
  };
  test("Should create a new user", async () => {
    const mockCreateUser = jest.fn(() => userData);
    jest.spyOn(User, "create").mockImplementation(() => mockCreateUser());

    const res = await request(app).post("/v1/users").send(userData);
    console.log("res: ", res.body);
    expect(res.status).toEqual(200);
    // expect(res.body).toHaveProperty("post");
  });
});

describe("Get Users", () => {
  test("Should get list of users", async () => {
    const res = await request(app).get("/v1/users");
    expect(res.status).toEqual(200);
    expect(res.body.object.length).toBeGreaterThan(0);
  });
});
