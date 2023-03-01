const request = require("supertest");
const mongoose = require("mongoose");
const Schedule = require("../schemas/scheduleSchema");
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

// describe(" Schedules tests", () => {
//   const todo = {
//     medicalCenterId: "63ff39878d3756452a3464f6",
//     doctorId: "63f5c4f0dc8dcb43785a7a96",
//     timeslot: "evening",
//     monday: false,
//     tuesday: false,
//     wednesday: false,
//     thursday: false,
//     friday: true,
//     saturday: false,
//     sunday: false,
//     price: 100,
//     startDate: "1-03-2023",
//     endDate: "20-03-2023",
//   };

//   test("Should create a new schedule", async () => {
//     const mockCreateSchedule = jest.fn(() => todo);
//     jest
//       .spyOn(Schedule, "create")
//       .mockImplementation(() => mockCreateSchedule());

//     const res = await request(app)
//       .post("/v1/schedules")
//       .set({
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2VkZWQxOTJiMzQ2YzU3ODcyZTlhODgiLCJ1c2VybmFtZSI6ImFkbWluIiwiaGFzaGVkUGFzc3dvcmQiOiIkMmIkMTAkTGp3c2lBMW40Zk83VGR2QmJxY3V6ZThFNDFETWZWY3NKY1FZT2kuZzNuVEJWLlU3ZS9qUC4iLCJpYXQiOjE2Nzc2NjA2MzMsImV4cCI6MTY4MDI1MjYzM30.JE6iMJBkswEBKe9QVq1RQlbFvWEQe4huy-IaVz-aZr8",
//       })
//       .send(todo);
//     expect(res.status).toEqual(200);
//     // expect(res.body).toHaveProperty("post");
//   });

//   test("Should get list of schedules", async () => {
//     const res = await request(app).get("/v1/schedules");
//     expect(res.status).toEqual(200);
//     // expect(res.body.institutions.length).toBeGreaterThan(0);
//   });
// });
