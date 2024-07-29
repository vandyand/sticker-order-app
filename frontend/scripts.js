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
