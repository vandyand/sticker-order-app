const request = require("supertest");

const app = require("../index"); // Assuming index.js is set to export the app

describe("Customer Endpoints", () => {
  it("should create a new customer", async () => {
    const response = await request(app).post("/customers").send({
      name: "Jane Smith",
      email: "jane.smith@example.com",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", "Jane Smith");
    expect(response.body).toHaveProperty("email", "jane.smith@example.com");
  });

  it("should retrieve all customers", async () => {
    const response = await request(app).get("/customers");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
