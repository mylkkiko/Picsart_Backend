-- CREATE TABLE categories (
--     category_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     category_name text
-- );

-- INSERT INTO categories(category_name) VALUES 
-- ('Electronics'),
-- ('Furniture'),
-- ('Stationery'),
-- ('Books'),
-- ('Toys');

-- SELECT * FROM categories ORDER BY category_id;

-- UPDATE categories SET category_name='Toys & Games' WHERE category_id=5;

-- INSERT INTO categories(category_name) VALUES ('Computer desks');

-- SELECT * FROM categories;

-- DELETE FROM categories WHERE category_name='Computer desks';

-- 6. PRIMARY KEY guarantees the uniqueness of the column and ensures that it will always be populated with a value, unlike UNIQUE (unless NOT NULL is specified, the value may be NULL). When a PRIMARY KEY is created, a B-tree index is automatically generated, unlike with a regular column. Thanks to the uniqueness guarantee provided by PRIMARY KEY, you can also create relationships via FOREIGN KEY.