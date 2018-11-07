SELECT c.* from comics_authors ca
JOIN comics c ON c.id = ca.comics_id
WHERE ca.author_id = ${authorId}
LIMIT ${limit} OFFSET ${offset};
