INSERT INTO comics_authors
(
    "comics_id",
    "author_id"
)
VALUES
(
    ${comicsId},
    ${authorId}
)
RETURNING *
