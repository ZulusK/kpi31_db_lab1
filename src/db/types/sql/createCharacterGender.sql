DO $$
BEGIN
IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'character_gender') THEN
create type character_gender AS ENUM (
'male',
'female'
);
END IF;
END
$$;
