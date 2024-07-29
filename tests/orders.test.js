const request = require("supertest");

const app = require("../index"); // Adjust this if necessary

describe("Order Endpoints", () => {
  it("should create a new order", async () => {
    const response = await request(app).post("/orders").send({
      customer_id: 1, // Replace with valid customer_id if needed
      quantity: 5,
      width: 3.0,
      height: 2.0,
      design_file: "path/to/design.svg",
      notes: "Urgent order",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("customer_id", 1);
    expect(response.body).toHaveProperty("quantity", 5);
    expect(response.body).toHaveProperty("width", 3.0);
    expect(response.body).toHaveProperty("height", 2.0);
    expect(response.body).toHaveProperty("design_file", "path/to/design.svg");
    expect(response.body).toHaveProperty("notes", "Urgent order");
  });

  it("should retrieve all orders", async () => {
    const response = await request(app).get("/orders");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
