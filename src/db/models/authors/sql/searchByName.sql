SELECT id, name
FROM authors,
     plainto_tsquery(${name}) AS q
WHERE make_tsvector_authors(name) @@ plainto_tsquery(${name})
ORDER BY ts_rank(make_tsvector_authors(name), q) DESC;