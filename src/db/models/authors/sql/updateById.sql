UPDATE authors
SET name = ${name}, country= ${country}, dob=${dob}, gender=${gender}
WHERE id = ${targetId}