CREATE TABLE IF NOT EXISTS authors
(
  id                  SERIAL PRIMARY KEY,
  name                varchar(100) NOT NULL,  
  dob                 date,
  gender              gender,
  country             varchar(100) NOT NULL
);
