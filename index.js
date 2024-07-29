const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const customerRoutes = require("./routes/customers");
const orderRoutes = require("./routes/orders");

app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Sticker Order API!");
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
