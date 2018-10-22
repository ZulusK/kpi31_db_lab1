CREATE TABLE IF NOT EXISTS series
(
  id                  SERIAL PRIMARY KEY,
  title               varchar(100) NOT NULL,
  rating              real
);
