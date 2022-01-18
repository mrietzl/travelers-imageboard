const spicedPg = require("spiced-pg");

// to create database named imageboard you need to run "createdb imageboard" once

// old code to access the secret keys
// progress_ YOUR_USERNAME:YOUR_PASSWORD@LOCALHOST:5432/DB_NAME
// const { connectionString } = require("./secrets.json");

// new code to access the secret keys (to make it available for heroku)
let connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    connectionString = require("./secrets.json").connectionString;
}

const db = spicedPg(connectionString);

module.exports.getImages = function () {
    // subqueries
    return db.query(
        `
        SELECT *, (
            SELECT id AS lowestid FROM images ORDER BY id ASC LIMIT 1
        ) FROM images ORDER BY id DESC LIMIT 6;
    `
    );
};

module.exports.getImagesAfter = function (after) {
    return db.query(
        `SELECT *, (
            SELECT id AS lowestid FROM images ORDER BY id ASC LIMIT 1
        ) FROM images WHERE id < $1 ORDER BY id DESC LIMIT 6;`,
        [after]
    );
};

module.exports.sendNewObject = (url, username, title, description) => {
    return db.query(
        `INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4) RETURNING *;`,
        [url, username, title, description]
    );
};

module.exports.getClickedImage = (selectedImageId) => {
    return db.query(
        `SELECT url, title, description, username, created_at FROM images WHERE id = $1;`,
        [selectedImageId]
    );
};

module.exports.getComments = (shownImageId) => {
    console.log(shownImageId);
    return db.query(
        `SELECT comment, username, created_at FROM comments WHERE image_id = $1;`,
        [shownImageId]
    );
};

module.exports.addComments = (comment, username, shownImageId) => {
    return db.query(
        `INSERT INTO comments (comment, username, image_id) VALUES ($1, $2, $3)
        RETURNING *;`,
        [comment, username, shownImageId]
    );
};
