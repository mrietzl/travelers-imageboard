const aws = require("aws-sdk");
const fs = require("fs");
const { unlink } = require("fs/promises");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets.json");
}

const s3 = new aws.S3({
    accessKeyId: secrets.AccessKeyId,
    secretAccessKey: secrets.AccessKeySecret,
});

module.exports.uploader = (req, res, next) => {
    const { filename, mimetype, size, path } = req.file;

    s3.putObject({
        Bucket: "micheles-imageboard",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size,
    })
        .promise()
        .then(() => {
            console.log("Upload successfull");
            unlink(path);
            next();
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
};
