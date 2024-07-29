const request = require("supertest");

const app = require("../index"); // Adjust this if necessary
const path = require("path");

describe("Order Endpoints", () => {
  it("should create a new order", async () => {
    const response = await request(app)
      .post("/orders")
      .field("customer_id", 1) // Replace with valid customer_id if needed
      .field("quantity", 5)
      .field("width", 3.0)
      .field("height", 2.0)
      .field("notes", "Urgent order")
      .attach("design_file", path.resolve(__dirname, "resources/svg_0.svg"));

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("customer_id", 1);
    expect(response.body).toHaveProperty("quantity", 5);
    expect(response.body).toHaveProperty("width", 3.0);
    expect(response.body).toHaveProperty("height", 2.0);
    expect(response.body).toHaveProperty("design_file");
    expect(response.body).toHaveProperty("notes", "Urgent order");
  });

  it("should retrieve all orders", async () => {
    const response = await request(app).get("/orders");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should retrieve an order by id", async () => {
    // First, create a new order
    const createResponse = await request(app)
      .post("/orders")
      .field("customer_id", 1) // Replace with valid customer_id if needed
      .field("quantity", 5)
      .field("width", 3.0)
      .field("height", 2.0)
      .field("notes", "Urgent order")
      .attach("design_file", path.resolve(__dirname, "resources/svg_1.svg"));

    const orderId = createResponse.body.id;

    // Retrieve the order by id
    const response = await request(app).get(`/orders/${orderId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", orderId);
    expect(response.body).toHaveProperty("customer_id", 1);
    expect(response.body).toHaveProperty("quantity", 5);
    expect(response.body).toHaveProperty("width", 3.0);
    expect(response.body).toHaveProperty("height", 2.0);
    expect(response.body).toHaveProperty("design_file");
    expect(response.body).toHaveProperty("notes", "Urgent order");
  });

  it("should update an order by id", async () => {
    // First, create a new order
    const createResponse = await request(app)
      .post("/orders")
      .field("customer_id", 1) // Replace with valid customer_id if needed
      .field("quantity", 5)
      .field("width", 3.0)
      .field("height", 2.0)
      .field("notes", "Urgent order")
      .attach("design_file", path.resolve(__dirname, "resources/svg_2.svg"));

    const orderId = createResponse.body.id;

    // Update the order by id
    const updateResponse = await request(app)
      .put(`/orders/${orderId}`)
      .field("customer_id", 1) // Replace with valid customer_id if needed
      .field("quantity", 10)
      .field("width", 4.0)
      .field("height", 3.0)
      .field("notes", "Updated order")
      .field("paid", true)
      .field("processed", true)
      .attach("design_file", path.resolve(__dirname, "resources/svg_3.svg"));

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body).toHaveProperty("id", orderId);
    expect(updateResponse.body).toHaveProperty("customer_id", 1);
    expect(updateResponse.body).toHaveProperty("quantity", 10);
    expect(updateResponse.body).toHaveProperty("width", 4.0);
    expect(updateResponse.body).toHaveProperty("height", 3.0);
    expect(updateResponse.body).toHaveProperty("design_file");
    expect(updateResponse.body).toHaveProperty("notes", "Updated order");
    expect(updateResponse.body).toHaveProperty("paid", true);
    expect(updateResponse.body).toHaveProperty("processed", true);
  });

  it("should delete an order by id", async () => {
    // First, create a new order
    const createResponse = await request(app)
      .post("/orders")
      .field("customer_id", 1) // Replace with valid customer_id if needed
      .field("quantity", 5)
      .field("width", 3.0)
      .field("height", 2.0)
      .field("notes", "Urgent order")
      .attach("design_file", path.resolve(__dirname, "resources/svg_4.svg"));

    const orderId = createResponse.body.id;

    // Delete the order by id
    const deleteResponse = await request(app).delete(`/orders/${orderId}`);

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body).toHaveProperty("id", orderId);
    expect(deleteResponse.body).toHaveProperty("customer_id", 1);
    expect(deleteResponse.body).toHaveProperty("quantity", 5);
    expect(deleteResponse.body).toHaveProperty("width", 3.0);
    expect(deleteResponse.body).toHaveProperty("height", 2.0);
    expect(deleteResponse.body).toHaveProperty("design_file");
    expect(deleteResponse.body).toHaveProperty("notes", "Urgent order");

    // Try to retrieve the deleted order
    const retrieveResponse = await request(app).get(`/orders/${orderId}`);

    expect(retrieveResponse.statusCode).toBe(404);
    expect(retrieveResponse.text).toBe("Order not found");
  });

  it("should retrieve orders by customer id", async () => {
    // First, create a new order
    const createResponse = await request(app)
      .post("/orders")
      .field("customer_id", 1) // Replace with valid customer_id if needed
      .field("quantity", 5)
      .field("width", 3.0)
      .field("height", 2.0)
      .field("notes", "Urgent order")
      .attach("design_file", path.resolve(__dirname, "resources/svg_5.svg"));

    // Retrieve the orders by customer id
    const response = await request(app).get(`/orders/customer/1`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("customer_id", 1);
  });
});
