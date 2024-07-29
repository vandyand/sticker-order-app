const request = require("supertest");
const app = require("../index"); // Assuming index.js is set to export the app

describe("Customer Endpoints", () => {
  it("should create a new customer", async () => {
    const response = await request(app).post("/customers").send({
      name: "John Doe",
      email: "john@example.com",
    });
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Create customer endpoint"); // Adjust based on actual implementation
  });

  it("should retrieve all customers", async () => {
    const response = await request(app).get("/customers");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("All customers"); // Adjust based on actual implementation
  });
});
