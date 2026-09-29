-- 1
-- SELECT COUNT(*) FROM products;


-- 2
-- SELECT AVG(price) FROM products;


-- 3
-- SELECT SUM(stock_quantity) FROM products GROUP BY category_id; 


-- 4
-- SELECT category_id FROM products GROUP BY category_id HAVING SUM(stock_quantity) > 100;


-- 5
-- SELECT product_id, SUM(quantity) AS total_quantity
-- FROM orders
-- GROUP BY product_id
-- ORDER BY product_id;
