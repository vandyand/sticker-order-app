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
      loadCustomers();
      closeModal("customer-modal");
    } else {
      alert("Failed to create customer.");
    }
  });

document
  .getElementById("order-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append(
      "customer_id",
      document.getElementById("customer-id").value
    );
    formData.append("quantity", document.getElementById("quantity").value);
    formData.append("width", document.getElementById("width").value);
    formData.append("height", document.getElementById("height").value);
    formData.append(
      "design_file",
      document.getElementById("design-file").files[0]
    );
    formData.append("notes", document.getElementById("notes").value);

    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Order created successfully!");
      loadOrders();
      closeModal("order-modal");
    } else {
      alert("Failed to create order.");
    }
  });

document
  .getElementById("load-customers")
  .addEventListener("click", loadCustomers);

document.getElementById("load-orders").addEventListener("click", loadOrders);

document
  .getElementById("filter-orders")
  .addEventListener("click", filterOrders);

document
  .getElementById("open-customer-modal")
  .addEventListener("click", function () {
    openModal("customer-modal");
  });

document
  .getElementById("open-order-modal")
  .addEventListener("click", function () {
    openModal("order-modal");
  });

document
  .getElementById("close-customer-modal")
  .addEventListener("click", function () {
    closeModal("customer-modal");
  });

document
  .getElementById("close-order-modal")
  .addEventListener("click", function () {
    closeModal("order-modal");
  });

window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target.id);
  }
});

async function loadCustomers() {
  const response = await fetch("http://localhost:3000/customers");

  if (response.ok) {
    const customers = await response.json();
    const customersList = document.getElementById("customers-list");
    customersList.innerHTML = "";
    customers.forEach((customer) => {
      const li = document.createElement("li");
      li.textContent = `ID: ${customer.id}, Name: ${customer.name}, Email: ${customer.email}`;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", async () => {
        await deleteCustomer(customer.id);
        loadCustomers();
      });
      li.appendChild(deleteButton);
      customersList.appendChild(li);
    });
  } else {
    alert("Failed to load customers.");
  }
}

async function loadOrders() {
  const ordersList = document.getElementById("orders-list");
  ordersList.innerHTML = ""; // Clear the list

  const response = await fetch("http://localhost:3000/orders");

  if (response.ok) {
    const orders = await response.json();
    orders.forEach(async (order) => {
      const li = document.createElement("li");
      li.innerHTML = `
          ID: ${order.id}, 
          Customer ID: ${order.customer_id}, 
          Quantity: ${order.quantity}, 
          Width: ${order.width}, 
          Height: ${order.height},  
          Notes: ${order.notes}
        `;

      // Fetch the design file content
      const designFileResponse = await fetch(
        `http://localhost:3000/uploads/${order.design_file}`
      );
      if (designFileResponse.ok) {
        const designFileContent = await designFileResponse.text();
        const designFileDiv = document.createElement("div");
        designFileDiv.innerHTML = designFileContent;
        li.appendChild(designFileDiv);
      } else {
        // Do nothing on failure
      }

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", async () => {
        await deleteOrder(order.id);
        loadOrders();
      });
      li.appendChild(deleteButton);
      ordersList.appendChild(li);
    });
  } else {
    alert("Failed to load orders.");
  }
}

async function filterOrders() {
  const customerId = document.getElementById("filter-customer-id").value;
  const ordersList = document.getElementById("orders-list");
  ordersList.innerHTML = ""; // Clear the list

  const response = await fetch(
    `http://localhost:3000/orders/customer/${customerId}`
  );

  if (response.ok) {
    const orders = await response.json();
    orders.forEach(async (order) => {
      const li = document.createElement("li");
      li.innerHTML = `
          ID: ${order.id}, 
          Customer ID: ${order.customer_id}, 
          Quantity: ${order.quantity}, 
          Width: ${order.width}, 
          Height: ${order.height},  
          Notes: ${order.notes}
        `;

      // Fetch the design file content
      const designFileResponse = await fetch(
        `http://localhost:3000/uploads/${order.design_file}`
      );
      if (designFileResponse.ok) {
        const designFileContent = await designFileResponse.text();
        const designFileDiv = document.createElement("div");
        designFileDiv.innerHTML = designFileContent;
        li.appendChild(designFileDiv);
      } else {
        // Do nothing on failure
      }

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", async () => {
        await deleteOrder(order.id);
        filterOrders();
      });
      li.appendChild(deleteButton);
      ordersList.appendChild(li);
    });
  } else {
    alert("Failed to load orders.");
  }
}

async function deleteCustomer(id) {
  const response = await fetch(`http://localhost:3000/customers/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    alert("Failed to delete customer.");
  }
}

async function deleteOrder(id) {
  const response = await fetch(`http://localhost:3000/orders/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    alert("Failed to delete order.");
  }
}

function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}
