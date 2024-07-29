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

// GET /orders/:id - Retrieve order by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).send("Order not found");
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// PUT /orders/:id - Update order by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    customer_id,
    quantity,
    width,
    height,
    design_file,
    notes,
    paid,
    processed,
  } = req.body;

  try {
    const result = await pool.query(
      "UPDATE orders SET customer_id = $1, quantity = $2, width = $3, height = $4, design_file = $5, notes = $6, paid = $7, processed = $8 WHERE id = $9 RETURNING *",
      [
        customer_id,
        quantity,
        width,
        height,
        design_file,
        notes,
        paid,
        processed,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Order not found");
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// DELETE /orders/:id - Delete order by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM orders WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Order not found");
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
