const { Pool } = require("pg");

const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "sticker_db",
  password: "pass",
  port: 5432,
});

module.exports = pool;
