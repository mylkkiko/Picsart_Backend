-- 1
-- CREATE TABLE products (
--     product_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     product_name text NOT NULL,
--     price numeric(8, 2) NOT NULL CHECK(price > 0),
--     category_id integer,
--     stock_quantity integer NOT NULL DEFAULT 0
-- );

-- CREATE TABLE orders (
--     order_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     product_id integer,
--     quantity integer NOT NULL CHECK(quantity > 0),
--     order_date date NOT NULL DEFAULT CURRENT_DATE
-- );

-- INSERT INTO products(product_name, price, category_id, stock_quantity) 
-- VALUES 
-- ('Wireless Mouse', 19.99, 1, 150),
-- ('Mechanical Keyboard', 49.99, 1, 80),
-- ('Standing Desk ', 249.99, 2, 30),
-- ('Office Chair', 129.50, 2, 45),
-- ('Notebook Pack', 4.99, 3, 300),
-- ('Gel Pens (12-pack)', 6.50, 3, 220),
-- ('PostgreSQL Handbook', 39.00, 4, 40),
-- ('SQL Cookbook', 34.00, 4, 40),
-- ('Building Blocks', 24.99, 5, 60),
-- ('Desk Lamp', 15.50, NULL, 0);

-- INSERT INTO orders(product_id, quantity, order_date) 
-- VALUES 
-- (1, 2, '2026-01-05'),
-- (1, 1, '2026-01-12'),
-- (2, 1, '2026-01-12'),
-- (3, 1, '2026-01-20'),
-- (4, 2, '2026-01-22'),
-- (5, 5, '2026-02-01'),
-- (6, 3, '2026-02-01'),
-- (7, 1, '2026-02-10'),
-- (1, 3, '2026-02-15'),
-- (6, 2, '2026-02-18');

-- 2
-- SELECT product_name, price, category_name
-- FROM products p
-- INNER JOIN categories c
-- ON p.category_id = c.category_id; 


-- 3
-- SELECT p.product_name, p.price, c.category_name
-- FROM products p
-- LEFT JOIN categories c
-- ON p.category_id = c.category_id;

-- Since INNER JOIN searches only for pairs that meet the condition 
-- from both tables, when it encounters NULL in one of them, it 
-- discards it. LEFT JOIN, on the other hand, takes all the data from 
-- the left table and pairs that meet the condition with the right table, 
-- so there are more rows.


-- 4
-- SELECT p.product_name, o.quantity, o.order_date 
-- FROM products p
-- LEFT JOIN orders o
-- ON p.product_id = o.product_id;

--5
-- LEFT JOIN should be chosen when we need all the data from the left 
-- table, including those for which no matching pair was found according 
-- to the condition, while INNER JOIN should be used when we strictly need 
-- all pairs that match the condition from both tables.