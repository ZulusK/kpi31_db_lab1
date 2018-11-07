SELECT c.* from comics c
INNER JOIN comics_authors ca ON ca.comics_id=c.id AND ca.author_id=${authorId}
WHERE c.id::TEXT LIKE '%'||${comicsId}||'%';
