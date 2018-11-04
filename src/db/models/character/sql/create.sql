CREATE TABLE IF NOT EXISTS characters
(
  id                  SERIAL PRIMARY KEY,
  nickname            varchar(100) NOT NULL,
  name                varchar(100) NOT NULL,
  gender              gender,
  skills              varchar(1000) NOT NULL,
  dob                 date,
  is_hero             bool    
);
