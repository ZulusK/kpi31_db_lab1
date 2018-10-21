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
