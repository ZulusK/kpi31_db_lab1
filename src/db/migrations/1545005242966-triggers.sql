CREATE FUNCTION check_not_neg_rating()
RETURNS TRIGGER AS $func$
BEGIN
IF NEW.rating < 0
THEN
RAISE EXCEPTION 'rating cant be lower than zero';
END IF;

RETURN NEW;
END;
$func$
LANGUAGE plpgsql;

CREATE TRIGGER t1
BEFORE INSERT OR UPDATE
                   ON series
                   FOR EACH ROW EXECUTE PROCEDURE check_not_neg_rating();

CREATE TRIGGER t2
BEFORE INSERT OR UPDATE
                   ON comics
                   FOR EACH ROW EXECUTE PROCEDURE check_not_neg_rating();

CREATE OR REPLACE FUNCTION calculate_stars()
  RETURNS SETOF COMICS AS
$BODY$
DECLARE
  r comics%ROWTYPE;

BEGIN
  FOR r IN SELECT * FROM comics
  LOOP
    IF r.rating <= 1
    THEN
      r.stars = '*';
    ELSIF r.rating <= 3
      THEN
        r.stars = '**';
    ELSIF r.rating <= 6
      THEN
        r.stars = '***';
    ELSIF r.rating <= 5
      THEN
        r.stars = '***';
    ELSIF r.rating <= 8
      THEN
        r.stars = '****';
    ELSE
      r.stars = '*****';
    END IF;
    RETURN NEXT r;
  END LOOP;
  RETURN;
END
$BODY$
LANGUAGE plpgsql;