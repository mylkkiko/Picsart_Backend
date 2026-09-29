-- ALTER TABLE authors ADD COLUMN website text;

-- UPDATE authors SET website='https://localhost:5173/' WHERE author_id=1;
-- UPDATE authors SET website='https://localhost:5273/' WHERE author_id=2;
-- UPDATE authors SET website='https://localhost:5573/' WHERE author_id=3;

-- ALTER TABLE authors ADD CONSTRAINT check_website CHECK(website IS NULL OR website LIKE 'https://%');
