const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST /orders - Create a new order
router.post("/", async (req, res) => {
  const { customer_id, quantity, width, height, design_file, notes } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO orders (customer_id, quantity, width, height, design_file, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [customer_id, quantity, width, height, design_file, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// GET /orders - Retrieve all orders
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
