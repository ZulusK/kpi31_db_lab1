SELECT a.* from comics_authors ca
JOIN authors a ON a.id = ca.author_id
WHERE ca.comics_id = ${comicsId}
LIMIT ${limit} OFFSET ${offset};
