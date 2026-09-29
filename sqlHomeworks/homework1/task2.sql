-- CREATE TABLE books (
--     book_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     author_id integer NOT NULL,
--     title text NOT NULL,
--     price numeric(8, 2) NOT NULL CHECK(price > 0),
--     pages integer CHECK(pages > 0),
--     tags text[],
--     published_on DATE NOT NULL,
--     CONSTRAINT fk_author
--         FOREIGN KEY (author_id)
--         REFERENCES authors(author_id)
-- );

-- INSERT INTO books (author_id, title, price, pages, tags, published_on) VALUES 
--     (1, 'The Silent Harbor', 18.99, 320, ARRAY ['fiction', 'mystery'], '2019-04-12'),
--     (1, 'Echoes of Winter', 22.50, 410, ARRAY ['fiction', 'drama'], '2021-11-03'),
--     (2, 'Learning SQL Step by Step', 39.00, 280, ARRAY ['education', 'technology'], '2020-06-15'),
--     (3, 'Mountains of Ararat', 27.75, NULL, ARRAY ['travel', 'history'], '2023-02-20'),
--     (2, 'Code and Coffee', 14.90, 190, ARRAY ['technology', 'humor'], '2024-08-01');


-- INSERT INTO books (author_id, title, price, pages, tags, published_on) VALUES 
    -- psql:task2.sql:24: ERROR:  syntax error at end of input
    -- LINE 3: ...rbor', -5, 320, ARRAY ['fiction', 'mystery'], '2019-04-12');
    -- (1, 'The Silent Harbor', -5, 320, ARRAY ['fiction', 'mystery'], '2019-04-12'),

    -- psql:task2.sql:26: ERROR:  new row for relation "books" violates check constraint "books_price_check"
    -- DETAIL:  Failing row contains (7, 9, The Silent Harbor, -5.00, 320, {fiction,mystery}, 2019-04-12).
    -- (9, 'The Silent Harbor', -5, 320, ARRAY ['fiction', 'mystery'], '2019-04-12');


