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
    ${publish_date},
    ${serieId},
    ${category},
    ${rating}
)
RETURNING *;
