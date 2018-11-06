SELECT id,title FROM comics
WHERE id::TEXT LIKE '%'||${id}||'%'
ORDER BY id ASC;