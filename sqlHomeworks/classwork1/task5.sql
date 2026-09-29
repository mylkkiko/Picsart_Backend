-- 1
-- SELECT c.category_name, SUM(o.quantity * p.price) AS revenue
-- FROM orders AS o
-- INNER JOIN products AS p
-- ON p.product_id=o.product_id
-- INNER JOIN categories AS c 
-- ON c.category_id=p.category_id
-- GROUP BY c.category_name;


-- 2
-- SELECT p.product_name, COUNT(o.quantity)
-- FROM products AS p
-- LEFT JOIN orders AS o
-- ON p.product_id=o.product_id
-- GROUP BY p.product_name;


-- 3
-- SELECT c.category_name, SUM(o.quantity * p.price) AS revenue
-- FROM orders AS o
-- INNER JOIN products AS p
-- ON o.product_id=p.product_id
-- INNER JOIN categories AS c
-- ON c.category_id=p.category_id
-- GROUP BY c.category_name
-- HAVING SUM(o.quantity * p.price) > 100;