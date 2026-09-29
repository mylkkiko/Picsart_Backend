-- CREATE TABLE book_signings (
--     signing_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     author_id integer NOT NULL,
--     store_location text NOT NULL,
--     during TSTZRANGE NOT NULL,
--     CONSTRAINT fk_book_signings_author
--         FOREIGN KEY (author_id)
--         REFERENCES authors(author_id)
-- );

-- CREATE EXTENSION btree_gist;

-- ALTER TABLE book_signings
-- ADD CONSTRAINT no_overlapping_signings
-- EXCLUDE USING gist (
--     author_id WITH =,
--     during WITH &&
-- );


-- INSERT INTO book_signings (author_id, store_location, during) VALUES
-- (1, 'Downtown Books', '[2026-03-01 14:00, 2026-03-01 16:00)');

-- psql:task5.sql:26: ERROR:  conflicting key value violates exclusion constraint "no_overlapping_signings"
-- DETAIL:  Key (author_id, during)=(1, ["2026-03-01 14:00:00+03","2026-03-01 16:00:00+03")) conflicts with existing key (author_id, during)=(1, ["2026-03-01 14:00:00+03","2026-03-01 16:00:00+03")).
-- INSERT INTO book_signings (author_id, store_location, during) VALUES
-- (1, 'City Mall', '[2026-03-01 14:00, 2026-03-01 16:00)');

-- INSERT INTO book_signings (author_id, store_location, during) VALUES
-- (2, 'City Mall', '[2026-03-01 15:00, 2026-03-01 17:00)');