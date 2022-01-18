DROP TABLE IF EXISTS images CASCADE;

CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://micheles-imageboard.s3.eu-central-1.amazonaws.com/xVqQ54jicsOuql_DpAjVkdLwQoI5VTfL.jpg',
    'Michele',
    'Leaving and let go …',
    'When I was sitting there in the plane leaving the ground I slowly realized that I was ready … more than I have ever been before! I was ready to let go, leave all the inconveniences behind and get ready for a completely new journey: The journey of my life … my future!'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://micheles-imageboard.s3.eu-central-1.amazonaws.com/mQ_5JePOwzoNpSvmt1Aw7lIIw2d3iOWc.jpg',
    'Michele',
    'Dubai!',
    'I have almost reached more than half of the way to my destination. Dubai was the first and only intermediate stop; and I can tell you that it was so much worth getting there. See you again very soon, my beauty!'
);


INSERT INTO images (url, username, title, description) VALUES (
    'https://micheles-imageboard.s3.eu-central-1.amazonaws.com/vufyfxY1z22n_exPSe8iQjRS2AawJeNu.jpg',
    'Michele',
    'My first evening …',
    'On this evening I understood that I have never really felt freedom before. Freedom was always a single word but I could never express it with emotions … until this moment!'
);


INSERT INTO images (url, username, title, description) VALUES (
    'https://micheles-imageboard.s3.eu-central-1.amazonaws.com/wetesKgVUNHnwfeJOCzJy97B_4EkTgqX.jpg',
    'Michele',
    'Empty beaches to clear my mind',
    'Just because you are alone does not mean that you are lonely. Being on your on for once in a while can clear your mind and open your soul.'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://micheles-imageboard.s3.eu-central-1.amazonaws.com/xNAZe-R5IktJjycehxDxMMP-hTl_V6dp.jpg',
    'Michele',
    'Surfing Challenges',
    'I had to do this at least one during my stay at this beautiful place. Learning surfing is quite difficult but at the end I loved it so much that I went outside on the waves for almost every day.'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://micheles-imageboard.s3.eu-central-1.amazonaws.com/SIbHHaxYa1WyJ86M9Yhx0_Kv-hNOTGa9.jpg',
    'Michele',
    'Namasté!',
    'This picture is definitely my favorite one. And whereas I could not even think about this poisture at the beginning … it now represents what I feel when I wake up every morning. Being in harmony with yourself!'
);

/* SELECT * FROM images;
 */
--- to run the sql file:
--- psql -d imageboard -f sql/images.sql