const request = require("supertest");
const mongoose = require("mongoose");
const MedicalCenter = require("../schemas/medicalCenterSchema");
const app = require("../app");

beforeEach(async () => {
  const connectDB = require("../config/database");
  await connectDB();
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe(" Medical center tests", () => {
  const todo = {
    name: "test",
    city: "Lahore",
    district: "Lahore",
    address: "street no 1",
    phoneNumber: ["123321232", "454545455"],
    googleMapLink: "map link",
    description: "This is description",
    email: "medicalCenter@gmail.com",
    facebookLink: "facebook link",
    website: "test.com",
  };

  test("Should create a new medical center", async () => {
    const mockCreateMedicalCenter = jest.fn(() => todo);
    jest
      .spyOn(MedicalCenter, "create")
      .mockImplementation(() => mockCreateMedicalCenter());

    const res = await request(app)
      .post("/v1/medicalCenters")
      .set({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VkZWQxOTJiMzQ2YzU3ODcyZTlhODgiLCJ1c2VybmFtZSI6ImFkbWluIiwiaGFzaGVkUGFzc3dvcmQiOiIkMmIkMTAkTGp3c2lBMW40Zk83VGR2QmJxY3V6ZThFNDFETWZWY3NKY1FZT2kuZzNuVEJWLlU3ZS9qUC4iLCJpYXQiOjE2Nzc2NjA2MzMsImV4cCI6MTY4MDI1MjYzM30.JE6iMJBkswEBKe9QVq1RQlbFvWEQe4huy-IaVz-aZr8",
      })
      .send(todo);
    expect(res.status).toEqual(200);
    // expect(res.body).toHaveProperty("post");
  });

  test("Should get list of medical centers", async () => {
    const res = await request(app).get("/v1/medicalCenters");
    expect(res.status).toEqual(200);
    // expect(res.body.institutions.length).toBeGreaterThan(0);
  });
});
