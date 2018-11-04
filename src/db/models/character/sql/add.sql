INSERT INTO characters
(
    "nickname",
    "name",
    "skills",
    "is_hero",
    "dob",
    "gender"
)
VALUES
(
    ${nickname},
    ${name},
    ${skills},
    ${is_hero},
    ${dob},
    ${gender}
)
RETURNING *;
