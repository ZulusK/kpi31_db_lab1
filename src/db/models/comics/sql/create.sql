CREATE OR REPLACE FUNCTION make_tsvector(title varchar, category comics_category)
  RETURNS TSVECTOR AS $$
BEGIN
  RETURN (
    setweight(to_tsvector('english', category::varchar), 'A') ||
          setweight(to_tsvector('english', title), 'B'));
END
$$
LANGUAGE 'plpgsql'
IMMUTABLE;

CREATE TABLE IF NOT EXISTS comics
(
  id                  SERIAL PRIMARY KEY,
  title               varchar(100) NOT NULL,
  category            comics_category,
  publish_date        timestamp,
  serie_id            integer NULL,
  rating              real,
  FOREIGN KEY (serie_id) references series (id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_fts_comics ON comics
  USING gin(make_tsvector(title, category));