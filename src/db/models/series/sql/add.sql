INSERT INTO series
(
    "title",
    "rating"
)
VALUES
(
    ${title},
    ${rating}
)
RETURNING *
