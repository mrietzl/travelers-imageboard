const express = require("express");
const app = express();
const db = require("./db.js");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3.js");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then((uid) => {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 4097152,
    },
});

app.use(express.static("./public"));
// we do not need this anymore because we user aws now
// app.use(express.static("./uploads"));

app.use(express.json());

app.get("/images", (req, res) => {
    // NO res.render (we don't have any handlebars templates),
    // ONLY data with res.json
    // templates are rendered client-side by Vue.js
    db.getImages().then((result) => {
        res.json(result.rows);
        console.log(result.rows);
    });
});

app.post("/images", uploader.single("file"), s3.uploader, (req, res) => {
    console.log(req.file);
    console.log(req.body);

    // store new image in the database
    // you can use therefore req.file.filename as the url in the database
    let { username, title, description } = req.body;
    // we do not need this anymore because we user aws now
    // let url = req.file.filename;
    let url =
        "https://micheles-imageboard.s3.eu-central-1.amazonaws.com/" +
        req.file.filename;

    // https://micheles-imageboard.s3.eu-central-1.amazonaws.com/jFxUew7pdV_pIStiyJlLOrOpcbSlbLbJ.jpg

    // send back the object with all the informations about the image
    // Remember to put 'RETURNING *' at your sql query to get the information
    db.sendNewObject(url, username, title, description)
        .then((result) => {
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("something went wrong while uploading the image:", err);
            res.sendStatus(500);
            // this needs to be fixed afterwards
            // res.render("error", { error: true });
        });
});

// GET route for part 4:
app.get("/images/more", (req, res) => {
    console.log(req.query.after);

    db.getImagesAfter(req.query.after)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(500);
        });
});

// GET route for part 3:
// to get all the information about the image the user clicked on
// (get url, title, description, username, created_at)
app.get("/clickedimage/:id", (req, res) => {
    let selectedImageId = req.params.id;

    db.getClickedImage(selectedImageId).then((result) => {
        res.json(result.rows[0]);
        console.log(result.rows[0]);
    });
});

// GET route for part 4:
// for getting all the comments for an image when the comments component mounts
app.get("/comments/:imageId", (req, res) => {
    let shownImageId = req.params.imageId;

    console.log(req.params);

    db.getComments(shownImageId).then((result) => {
        res.json(result.rows);
        console.log(result.rows);
    });
});

// POST route for part 4:
// for inserting a new comment into the database
app.post("/comment", (req, res) => {
    console.log(req.body);

    let { comment, username, image_id } = req.body;

    db.addComments(comment, username, image_id)
        .then((result) => {
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log(
                "something went wrong while uploading the comment:",
                err
            );
            res.sendStatus(500);
            // this needs to be fixed afterwards
            // res.render("error", { error: true });
        });
});

// order of the routes is important!
// catch-all route needs to come last!
app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

// setup for heroku
if (require.main === module) {
    app.listen(process.env.PORT || 8080, () => {
        console.log(
            "michèle's traveler's image board petition is now running on https://travelers-imageboard.herokuapp.com/ or http://localhost:8080"
        );
    });
}
