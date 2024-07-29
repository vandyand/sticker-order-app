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
    if (err.code === "23505") {
      // Unique violation error code
      res
        .status(409)
        .send("Customer with the same name and email already exists");
    } else {
      console.error(err);
      res.status(500).send("Server error");
    }
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

// GET /customers/:id - Retrieve customer by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).send("Customer not found");
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// PUT /customers/:id - Update customer by id

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      "UPDATE customers SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Customer not found");
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      // Unique violation error code
      res
        .status(409)
        .send("Customer with the same name and email already exists");
    } else {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
});

// DELETE /customers/:id - Delete customer by id

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM customers WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Customer not found");
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
