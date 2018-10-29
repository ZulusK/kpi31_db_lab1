DO $$
BEGIN
IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'comics_category') THEN
create type comics_category AS ENUM (
'manga',
'science fiction',
'fantasy',
'action',
'horror',
'romance',
'adult'
);
END IF;
END
$$;
