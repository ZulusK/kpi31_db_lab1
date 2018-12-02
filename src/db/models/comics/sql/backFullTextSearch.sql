SELECT id, ts_headline(title, q) as title, ts_headline(category::text, q) as category
FROM comics,
     to_tsquery($1) AS q
WHERE NOT make_tsvector(title, category) @@ to_tsquery($1)
ORDER BY ts_rank(make_tsvector(title, category), q) DESC;