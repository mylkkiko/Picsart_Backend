-- 1
-- ALTER TABLE products
-- ADD CONSTRAINT fk_categories
-- FOREIGN KEY (category_id)
-- REFERENCES categories(category_id);

-- 2
-- ALTER TABLE orders
-- ADD CONSTRAINT fk_orders_products
-- FOREIGN KEY (product_id)
-- REFERENCES products(product_id);

-- 3
-- INSERT INTO products(product_name, price, category_id, stock_quantity) 
-- VALUES 
-- ('Keyboard', 19.99, 999, 120);
-- insert or update on table "products" violates foreign key constraint "fk_categories"
-- DETAIL:  Key (category_id)=(999) is not present in table "categories".

-- 4
-- DELETE FROM categories WHERE category_name='Electronics';
-- ERROR:  update or delete on table "categories" violates foreign key constraint "fk_categories" on table "products"
-- DETAIL:  Key (category_id)=(1) is still referenced from table "products".

-- 5
-- Before the restriction was introduced, it was possible to insert an order with product_id = 99 without an error, even though there is no product with that ID in the products table. Such a row does not reference anything: in a revenue report with INNER JOIN, this order would have silently disappeared, and the amount would have been understated. The foreign key now rejects such inserts.