SELECT id,name FROM authors
WHERE id::TEXT LIKE '%'||${id}||'%'
ORDER BY id ASC;