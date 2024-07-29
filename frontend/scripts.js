document
  .getElementById("customer-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("customer-name").value;
    const email = document.getElementById("customer-email").value;

    const response = await fetch("http://localhost:3000/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      alert("Customer created successfully!");
    } else {
      alert("Failed to create customer.");
    }
  });

document
  .getElementById("order-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const customer_id = document.getElementById("customer-id").value;
    const quantity = document.getElementById("quantity").value;
    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;
    const design_file = document.getElementById("design-file").value;
    const notes = document.getElementById("notes").value;

    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_id,
        quantity,
        width,
        height,
        design_file,
        notes,
      }),
    });

    if (response.ok) {
      alert("Order created successfully!");
    } else {
      alert("Failed to create order.");
    }
  });

document
  .getElementById("load-customers")
  .addEventListener("click", async function () {
    const response = await fetch("http://localhost:3000/customers");

    if (response.ok) {
      const customers = await response.json();
      const customersList = document.getElementById("customers-list");
      customersList.innerHTML = "";
      customers.forEach((customer) => {
        const li = document.createElement("li");
        li.textContent = `ID: ${customer.id}, Name: ${customer.name}, Email: ${customer.email}`;
        customersList.appendChild(li);
      });
    } else {
      alert("Failed to load customers.");
    }
  });

document
  .getElementById("load-orders")
  .addEventListener("click", async function () {
    const response = await fetch("http://localhost:3000/orders");

    if (response.ok) {
      const orders = await response.json();
      const ordersList = document.getElementById("orders-list");
      ordersList.innerHTML = "";
      orders.forEach((order) => {
        const li = document.createElement("li");
        li.textContent = `ID: ${order.id}, Customer ID: ${order.customer_id}, Quantity: ${order.quantity}, Width: ${order.width}, Height: ${order.height}, Design File: ${order.design_file}, Notes: ${order.notes}`;
        ordersList.appendChild(li);
      });
    } else {
      alert("Failed to load orders.");
    }
  });
