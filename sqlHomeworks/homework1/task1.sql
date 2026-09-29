-- CREATE TABLE authors (
--     author_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     full_name text NOT NULL,
--     email text UNIQUE NOT NULL,
--     country VARCHAR(50) DEFAULT 'Unknown',
--     joined_at TIMESTAMPTZ NOT NULL DEFAULT now()
-- );

-- INSERT INTO authors (full_name, email, country) VALUES
-- ('Amanda Lee', 'amanda.lee@mail.com', 'USA'),
-- ('Carlos Ruiz', 'carlos.ruiz@mail.com', 'Spain'),
-- ('Anna Petrosyan', 'anna.petrosyan@mail.com', DEFAULT);

-- INSERT INTO authors (full_name, email, country) VALUES
-- ('Anahit Petrosyan', 'anna.petrosyan@mail.com', DEFAULT);
-- Error during mail re‑submission
-- psql:task1.sql:15: ERROR:  duplicate key value violates unique constraint "authors_email_key"
-- DETAIL:  Key (email)=(anna.petrosyan@mail.com) already exists.


