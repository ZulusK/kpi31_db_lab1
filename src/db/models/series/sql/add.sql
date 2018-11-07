INSERT INTO series
(
    "title",
    "rating",
    "is_ended"
)
VALUES
(
    ${title},
    ${rating},
    ${idEnded}
)
RETURNING *
