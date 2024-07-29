const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const customerRoutes = require("./routes/customers");
const orderRoutes = require("./routes/orders");

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Serve static files from the "uploads" directory with correct MIME type
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".svg")) {
        res.setHeader("Content-Type", "image/svg+xml");
      }
    },
  })
);

app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Sticker Order API!");
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
  });
}

module.exports = app;
