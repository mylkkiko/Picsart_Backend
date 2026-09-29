-- ALTER TABLE categories ADD COLUMN description text;
-- ALTER TABLE categories ADD COLUMN is_active boolean NOT NULL DEFAULT true;

-- INSERT INTO categories(category_name) VALUES ('Electronics'); 
-- ERROR:  duplicate key value violates unique constraint "categories_name_key"

-- INSERT INTO categories(category_name) VALUES ('TV'); 
-- ERROR:  new row for relation "categories" violates check constraint "categories_name_length_check"

-- INSERT INTO categories(category_name) VALUES (NULL); 
-- ERROR:  null value in column "category_name" of relation "categories" violates not-null constraint

-- INSERT INTO categories(category_name) VALUES ('Sports');
-- 4. The value will be t(true), since we specified with DEFAULT what the value should be if this field is not filled.