INSERT INTO authors
(
    "name",
    "dob",
    "gender",
    "country"
)
VALUES
(
    ${name},
    ${dob},
    ${gender},
    ${country}   
)
RETURNING *;
