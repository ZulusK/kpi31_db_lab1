CREATE TABLE IF NOT EXISTS comics_authors
(
    comics_id SERIAL NOT NULL,
    author_id SERIAL NOT NULL,
    CONSTRAINT comics_authors_comics_id_fk FOREIGN KEY (comics_id) REFERENCES comics (id) ON DELETE CASCADE,
    CONSTRAINT comics_authors_authors_id_fk FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE CASCADE 
);
CREATE INDEX IF NOT EXISTS comics_authors_comics_id_author_id_index ON comics_authors (comics_id, author_id);