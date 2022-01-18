DROP TABLE IF EXISTS comments;

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    comment VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    image_id INTEGER NOT NULL REFERENCES images(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* INSERT INTO comments (comment, username, image_id)
    VALUES ('Great project! 🤍','ms_creative', 3 ); */

SELECT * FROM comments;

--- to run the sql file:
--- psql -d imageboard -f sql/comments.sql