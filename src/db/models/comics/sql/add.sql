INSERT INTO comics
(
    "title",
    "publish_date",
    "serie_id",
    "category",
    "rating"
)
VALUES
(
    ${title},
    ${publishDate},
    ${serieId},
    ${category},
    ${rating}
)
RETURNING *;
