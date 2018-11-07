UPDATE comics
SET title = ${title}, rating= ${rating}, publish_date=${publishDate}, category=${category}, serie_id=${seriesId}
WHERE id = ${targetId}