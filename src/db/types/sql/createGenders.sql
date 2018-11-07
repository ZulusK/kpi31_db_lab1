DO $$
BEGIN
IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender') THEN
create type gender AS ENUM (
'male',
'female'
);
END IF;
END
$$;
