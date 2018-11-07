CREATE OR REPLACE FUNCTION make_tsvector_authors(name varchar)
  RETURNS TSVECTOR AS $$
BEGIN
  RETURN (setweight(to_tsvector('english', name), 'A'));
END
$$
LANGUAGE 'plpgsql'
IMMUTABLE;

CREATE TABLE IF NOT EXISTS authors
(
  id                  SERIAL PRIMARY KEY,
  name                varchar(100) NOT NULL,  
  dob                 date,
  gender              gender,
  country             varchar(100) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_fts_author ON authors
  USING gin(make_tsvector_authors(name));