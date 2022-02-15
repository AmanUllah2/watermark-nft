import { IncomingForm } from "formidable";
const { promisify } = require("util");
import { promises as fs } from "fs";
const unlinkAsync = promisify(fs.unlink);
const fleekStorage = require("@fleekhq/fleek-storage-js");

var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      console.log(files.name);
      // console.log(files.file.filepath)
      var oldPath = files.file.filepath;
      var newPath = `./public/uploads/${files.file.originalFilename}`;
      const uploadedFile = fleekStorage.upload({
        apiKey: "AGg7ny/xuxTpoVaRLdeZbQ==",
        apiSecret: "zyW0v7bWAtLfLS/0X+0tZWaT4JkM9UGnx37H8nhAdhg=",
        key: files.file.originalFilename,
        data: files,
      });
      if (uploadedFile) {
        unlinkAsync(oldPath);
        res.status(200).send({
          message: "File uploaded successfully",
          url: uploadedFile.publicUrl,
          filename: uploadedFile.key,
        });
      }
      mv(oldPath, newPath, function (err) {});
      res.status(200).json({ uploadedFile });
    });
  });
};
