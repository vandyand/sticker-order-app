const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const randomLetters = Math.random().toString(36).substring(2, 6);
    cb(null, file.fieldname + "-" + randomLetters + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

// POST /orders - Create a new order with file upload
router.post("/", upload.single("design_file"), async (req, res) => {
  const { customer_id, quantity, width, height, notes } = req.body;
  const design_file = req.file.filename;

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

// GET /orders/customer/:customer_id - Retrieve orders by customer id
router.get("/customer/:customer_id", async (req, res) => {
  const { customer_id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM orders WHERE customer_id = $1",
      [customer_id]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// PUT /orders/:id - Update order by id
router.put("/:id", upload.single("design_file"), async (req, res) => {
  const { id } = req.params;
  const { customer_id, quantity, width, height, notes, paid, processed } =
    req.body;
  const new_design_file = req.file ? req.file.filename : null;

  try {
    // Retrieve the current design file before updating
    const currentOrderResult = await pool.query(
      "SELECT design_file FROM orders WHERE id = $1",
      [id]
    );
    if (currentOrderResult.rows.length === 0) {
      return res.status(404).send("Order not found");
    }
    const current_design_file = currentOrderResult.rows[0].design_file;

    // Update the order
    const result = await pool.query(
      "UPDATE orders SET customer_id = $1, quantity = $2, width = $3, height = $4, design_file = COALESCE($5, design_file), notes = $6, paid = $7, processed = $8 WHERE id = $9 RETURNING *",
      [
        customer_id,
        quantity,
        width,
        height,
        new_design_file,
        notes,
        paid,
        processed,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Order not found");
    }

    // Delete the old design file if a new one is uploaded
    if (new_design_file) {
      const oldFilePath = path.join(
        __dirname,
        "../uploads",
        current_design_file
      );
      fs.unlink(oldFilePath, (err) => {
        if (err) {
          console.error("Failed to delete old file:", err);
        }
      });
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
    // Retrieve the design file path before deleting the order
    const orderResult = await pool.query(
      "SELECT design_file FROM orders WHERE id = $1",
      [id]
    );
    if (orderResult.rows.length === 0) {
      return res.status(404).send("Order not found");
    }
    const design_file = orderResult.rows[0].design_file;

    // Delete the order from the database
    const result = await pool.query(
      "DELETE FROM orders WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Order not found");
    }

    // Delete the design file from the filesystem
    const filePath = path.join(__dirname, "../uploads", design_file);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to delete file:", err);
      }
    });

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
