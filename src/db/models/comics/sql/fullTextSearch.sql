SELECT id, ts_headline(title, q) as title, ts_headline(category::text, q) as category
FROM comics,
     plainto_tsquery($1) AS q
WHERE make_tsvector(title, category) @@ plainto_tsquery($1)
ORDER BY ts_rank(make_tsvector(title, category), q) DESC;