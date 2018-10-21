CREATE TABLE IF NOT EXISTS comics
(
  id                  SERIAL PRIMARY KEY,
  title               varchar(100),
  category            comics_category,
  publish_date        date,
  serie               SERIAL,
  rating              real,
  FOREIGN KEY (serie) references series (id) ON DELETE SET NULL
);
DROP TYPE IF EXISTS comics_category CASCADE;
CREATE TYPE comics_category AS ENUM
(
    'manga',
    'science fiction',
    'fantasy',
    'action',
    'horror',
    'romance',
    'adult'
);
