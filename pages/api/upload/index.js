// Import file read library
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
// Import Fleek
const fleekStorage = require("@fleekhq/fleek-storage-js");
// Import dotenv if you want to use env vars
require('dotenv/config');
// API for upload file
exports.uploadFile = async (req, res) => {
  if (!req.file)
    res.status(400).send({
      message: "File is requried",
    });
  const file = req.file;
  try {
    fs.readFile(file.path, async (error, fileData) => {
      const uploadedFile = await fleekStorage.upload({
        apiKey: "AGg7ny/xuxTpoVaRLdeZbQ==",
        apiSecret:"zyW0v7bWAtLfLS/0X+0tZWaT4JkM9UGnx37H8nhAdhg=",
        key: file.filename,
        data: fileData,
      });
      if (uploadedFile) {
        unlinkAsync(file.path);
        res.status(200).send({
          message: "File uploaded successfully",
          url: uploadedFile.publicUrl,
          filename: uploadedFile.key,
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};