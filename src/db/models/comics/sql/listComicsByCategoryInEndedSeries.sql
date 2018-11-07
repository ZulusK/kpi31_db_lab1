SELECT c.*, s.title, s.is_ended from comics c
JOIN series s ON c.serie_id = s.id AND s.is_ended=${isEnded}
WHERE c.category = ${category}
LIMIT ${limit} OFFSET ${offset};