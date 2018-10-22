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
