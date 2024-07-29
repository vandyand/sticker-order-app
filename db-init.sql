DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    CONSTRAINT unique_name_email UNIQUE (name, email)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    quantity INTEGER NOT NULL,
    width FLOAT NOT NULL,
    height FLOAT NOT NULL,
    design_file VARCHAR(255) NOT NULL,
    notes TEXT,
    paid BOOLEAN DEFAULT FALSE,
    processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);