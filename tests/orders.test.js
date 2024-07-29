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
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Create order endpoint");
  });

  it("should retrieve all orders", async () => {
    const response = await request(app).get("/orders");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("All orders");
  });
});
