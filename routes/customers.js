const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST /customers - Create a new customer
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// GET /customers - Retrieve all customers
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
