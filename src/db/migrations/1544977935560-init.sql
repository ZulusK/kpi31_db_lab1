CREATE TYPE COMICS_CATEGORY AS ENUM (
'manga',
'science fiction',
'fantasy',
'action',
'horror',
'romance',
'adult'
);

CREATE TYPE GENDER AS ENUM (
'male',
'female'
);

CREATE OR REPLACE FUNCTION make_tsvector_authors(name VARCHAR)
RETURNS TSVECTOR AS $$
BEGIN
RETURN (setweight(to_tsvector('english', name), 'A'));
END
$$
LANGUAGE 'plpgsql'
IMMUTABLE;

CREATE TABLE IF NOT EXISTS authors
(
  id      SERIAL PRIMARY KEY,
  name    VARCHAR(100) NOT NULL,
  dob     DATE,
  gender  GENDER,
  country VARCHAR(100) NOT NULL
  );
CREATE INDEX IF NOT EXISTS idx_fts_author
ON authors
USING gin (make_tsvector_authors(name));

CREATE TABLE IF NOT EXISTS characters
(
  id       SERIAL PRIMARY KEY,
  nickname VARCHAR(100)  NOT NULL,
  name     VARCHAR(100)  NOT NULL,
  gender   GENDER,
  skills   VARCHAR(1000) NOT NULL,
  dob      DATE,
  is_hero  BOOL
  );

CREATE OR REPLACE FUNCTION make_tsvector(title VARCHAR, category COMICS_CATEGORY)
RETURNS TSVECTOR AS $$
BEGIN
RETURN (
setweight(to_tsvector('english', category :: VARCHAR), 'A') ||
setweight(to_tsvector('english', title), 'B'));
END
$$
LANGUAGE 'plpgsql'
IMMUTABLE;

CREATE TABLE IF NOT EXISTS series
(
  id       SERIAL PRIMARY KEY,
  title    VARCHAR(100) NOT NULL,
  rating   REAL,
  is_ended BOOLEAN DEFAULT FALSE
  );

CREATE TABLE IF NOT EXISTS comics
(
  id           SERIAL PRIMARY KEY,
  title        VARCHAR(100) NOT NULL,
  category     COMICS_CATEGORY,
  publish_date TIMESTAMP,
  serie_id     INTEGER      NULL,
  rating       REAL,
  FOREIGN KEY (serie_id) REFERENCES series (id) ON DELETE SET NULL
  );
CREATE INDEX IF NOT EXISTS comics_id_index
ON comics (publish_date DESC, serie_id);
CREATE INDEX IF NOT EXISTS idx_fts_comics
ON comics
USING gin (make_tsvector(title, category));

CREATE TABLE IF NOT EXISTS comics_authors
(
  comics_id SERIAL NOT NULL,
  author_id SERIAL NOT NULL,
  CONSTRAINT comics_authors_comics_id_fk FOREIGN KEY (comics_id) REFERENCES comics (id) ON DELETE CASCADE,
  CONSTRAINT comics_authors_authors_id_fk FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE CASCADE,
  PRIMARY KEY (comics_id, author_id)
  );
CREATE UNIQUE INDEX IF NOT EXISTS comics_authors_comics_id_author_id_index
ON comics_authors (comics_id, author_id);
