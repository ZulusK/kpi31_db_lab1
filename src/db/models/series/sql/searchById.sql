SELECT id,title FROM series
WHERE id::TEXT LIKE '%'||${id}||'%'
ORDER BY id ASC;