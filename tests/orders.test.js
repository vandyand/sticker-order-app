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

  it("should retrieve an order by id", async () => {
    // First, create a new order
    const createResponse = await request(app).post("/orders").send({
      customer_id: 1, // Replace with valid customer_id if needed
      quantity: 5,
      width: 3.0,
      height: 2.0,
      design_file: "path/to/design.svg",
      notes: "Urgent order",
    });

    const orderId = createResponse.body.id;

    // Retrieve the order by id
    const response = await request(app).get(`/orders/${orderId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", orderId);
    expect(response.body).toHaveProperty("customer_id", 1);
    expect(response.body).toHaveProperty("quantity", 5);
    expect(response.body).toHaveProperty("width", 3.0);
    expect(response.body).toHaveProperty("height", 2.0);
    expect(response.body).toHaveProperty("design_file", "path/to/design.svg");
    expect(response.body).toHaveProperty("notes", "Urgent order");
  });

  it("should update an order by id", async () => {
    // First, create a new order
    const createResponse = await request(app).post("/orders").send({
      customer_id: 1, // Replace with valid customer_id if needed
      quantity: 5,
      width: 3.0,
      height: 2.0,
      design_file: "path/to/design.svg",
      notes: "Urgent order",
    });

    const orderId = createResponse.body.id;

    // Update the order by id
    const updateResponse = await request(app).put(`/orders/${orderId}`).send({
      customer_id: 1, // Replace with valid customer_id if needed
      quantity: 10,
      width: 4.0,
      height: 3.0,
      design_file: "path/to/updated_design.svg",
      notes: "Updated order",
      paid: true,
      processed: true,
    });

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body).toHaveProperty("id", orderId);
    expect(updateResponse.body).toHaveProperty("customer_id", 1);
    expect(updateResponse.body).toHaveProperty("quantity", 10);
    expect(updateResponse.body).toHaveProperty("width", 4.0);
    expect(updateResponse.body).toHaveProperty("height", 3.0);
    expect(updateResponse.body).toHaveProperty(
      "design_file",
      "path/to/updated_design.svg"
    );
    expect(updateResponse.body).toHaveProperty("notes", "Updated order");
    expect(updateResponse.body).toHaveProperty("paid", true);
    expect(updateResponse.body).toHaveProperty("processed", true);
  });

  it("should delete an order by id", async () => {
    // First, create a new order
    const createResponse = await request(app).post("/orders").send({
      customer_id: 1, // Replace with valid customer_id if needed
      quantity: 5,
      width: 3.0,
      height: 2.0,
      design_file: "path/to/design.svg",
      notes: "Urgent order",
    });

    const orderId = createResponse.body.id;

    // Delete the order by id
    const deleteResponse = await request(app).delete(`/orders/${orderId}`);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body).toHaveProperty("id", orderId);
    expect(deleteResponse.body).toHaveProperty("customer_id", 1);
    expect(deleteResponse.body).toHaveProperty("quantity", 5);
    expect(deleteResponse.body).toHaveProperty("width", 3.0);
    expect(deleteResponse.body).toHaveProperty("height", 2.0);
    expect(deleteResponse.body).toHaveProperty(
      "design_file",
      "path/to/design.svg"
    );
    expect(deleteResponse.body).toHaveProperty("notes", "Urgent order");

    // Try to retrieve the deleted order
    const retrieveResponse = await request(app).get(`/orders/${orderId}`);

    expect(retrieveResponse.statusCode).toBe(404);
    expect(retrieveResponse.text).toBe("Order not found");
  });
});
