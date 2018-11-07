SELECT * from comics c
WHERE c.serie_id = ${seriesId}
LIMIT ${limit} OFFSET ${offset};