INSERT INTO ${schema~}.comics
(
    title
)
VALUES
(
    $1
)
RETURNING *
