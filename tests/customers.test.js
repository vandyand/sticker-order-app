const request = require("supertest");

const app = require("../index"); // Assuming index.js is set to export the app

describe("Customer Endpoints", () => {
  it("should create a new customer", async () => {
    let uniqueName = "Jane Smith" + Math.random();
    let uniqueEmail = "jane.smith" + Math.random() + "@example.com";
    const response = await request(app).post("/customers").send({
      name: uniqueName,
      email: uniqueEmail,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", uniqueName);
    expect(response.body).toHaveProperty("email", uniqueEmail);
  });

  it("should retrieve all customers", async () => {
    const response = await request(app).get("/customers");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should not create a customer with duplicate name and email", async () => {
    let uniqueName = "John Doe" + Math.random();
    let uniqueEmail = "john.doe" + Math.random() + "@example.com";
    // First, create a customer
    await request(app).post("/customers").send({
      name: uniqueName,
      email: uniqueEmail,
    });

    // Try to create the same customer again
    const response = await request(app).post("/customers").send({
      name: uniqueName,
      email: uniqueEmail,
    });

    expect(response.statusCode).toBe(409);
    expect(response.text).toBe(
      "Customer with the same name and email already exists"
    );
  });

  it("should retrieve a customer by id", async () => {
    let uniqueName = "Alice Johnson" + Math.random();
    let uniqueEmail = "alice.johnson" + Math.random() + "@example.com";
    // First, create a customer
    const createResponse = await request(app).post("/customers").send({
      name: uniqueName,
      email: uniqueEmail,
    });

    const customerId = createResponse.body.id;

    // Retrieve the customer by id
    const response = await request(app).get(`/customers/${customerId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", customerId);
    expect(response.body).toHaveProperty("name", uniqueName);
    expect(response.body).toHaveProperty("email", uniqueEmail);
  });

  it("should update a customer by id", async () => {
    let uniqueName = "Charlie Green" + Math.random();
    let uniqueEmail = "charlie.green" + Math.random() + "@example.com";
    // First, create a customer
    const createResponse = await request(app).post("/customers").send({
      name: uniqueName,
      email: uniqueEmail,
    });

    const customerId = createResponse.body.id;

    // Update the customer by id
    let updatedName = "Charlie Updated" + Math.random();
    let updatedEmail = "charlie.updated" + Math.random() + "@example.com";
    const updateResponse = await request(app)
      .put(`/customers/${customerId}`)
      .send({
        name: updatedName,
        email: updatedEmail,
      });

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body).toHaveProperty("id", customerId);
    expect(updateResponse.body).toHaveProperty("name", updatedName);
    expect(updateResponse.body).toHaveProperty("email", updatedEmail);
  });

  it("should delete a customer by id", async () => {
    let uniqueName = "Bob Brown" + Math.random();
    let uniqueEmail = "bob.brown" + Math.random() + "@example.com";
    // First, create a customer
    const createResponse = await request(app).post("/customers").send({
      name: uniqueName,
      email: uniqueEmail,
    });

    const customerId = createResponse.body.id;

    // Delete the customer by id
    const deleteResponse = await request(app).delete(
      `/customers/${customerId}`
    );

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body).toHaveProperty("id", customerId);
    expect(deleteResponse.body).toHaveProperty("name", uniqueName);
    expect(deleteResponse.body).toHaveProperty("email", uniqueEmail);

    // Try to retrieve the deleted customer
    const retrieveResponse = await request(app).get(`/customers/${customerId}`);

    expect(retrieveResponse.statusCode).toBe(404);
    expect(retrieveResponse.text).toBe("Customer not found");
  });
});
