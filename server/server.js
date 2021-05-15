const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const dateFormat = require("dateformat");
const chalk = require("chalk");
const mv = require("mv");
const rimraf = require("rimraf");
const moment = require("moment");
const archiver = require("archiver");
const extract = require("extract-zip");

var port = process.env.PORT || 5000;
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

app.listen(port, function () {
  console.log("Server running on port: " + port);
});

var my_path;
var myZip2; 
var my_file1;
var folder_path;

// Responds with the relative path of a selected directory or file
app.post("/sendPath", (req, res) => {
  my_path = req.body.sent_path;
  my_file1 = req.body.sent_file;
  var isDir = path.dirname(my_path);
  res.send({ full_path: my_path, the_dir: isDir });
});

// Uploads files to the file directory
app.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  const myFile = req.files.file;

  myFile.mv(`${folder_path + "/"}${myFile.name}`, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: "Error occured" });
    }
    return res.send({ name: myFile.name, path: `/${myFile.name}` });
  });
});

// List all sub-directories in the 'files' directory.
app.post("/getAllMainFolders", (req, res) => {
  var dirPath = "./files/";
  var result = [];
  fs.readdir(dirPath, function (err, filesPath) {
    if (err) throw err;
    result = filesPath.map(function (filePath) {
      return dirPath + filePath;
    });
    res.send(result);
  });
});

// List all files and directories from a selected directory
app.post("/getAllFilesFromSelectedFolder", (req, res) => {
  var dirPath = req.body.path_name;
  folder_path = dirPath;
  var result = [];

  fs.readdir(dirPath, function (err, filesPath) {
    if (err) throw err;
    result = filesPath.map(function (filePath) {
      return {
        paths: dirPath + "/" + filePath,
        names: filePath,
        the_time: lastUpdatedDate(dirPath + "/" + filePath),
        is_dir: isDir(dirPath + "/" + filePath),
        fileExt: path.extname(dirPath + "/" + filePath),
      };
    });
    res.send(
      result.sort(function (a, b) {
        return new Date(b.the_time) - new Date(a.the_time);
      })
    );
  });
});

// Format the last time a file was edited/created
function lastUpdatedDate(file) {
  const { mtime, ctime } = fs.statSync(file);
  return dateFormat(ctime, "mm/dd/yy, h:MM TT");
}

// Check if a given path is a directory
function isDir(path) {
  try {
    var stat = fs.lstatSync(path);
    return stat.isDirectory();
  } catch (e) {
    return false;
  }
}

// Create new folder
app.post("/newFolder", (req, res) => {
  var dir = req.body.current_path + "/" + req.body.folder_name;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  console.log(
    chalk.green(
      "A new folder `" +
        req.body.folder_name +
        "` was created on " +
        moment().format("MMMM Do YYYY, h:mm:ss a")
    )
  );
  return res.sendStatus(200);
});

// Pass the user's selected paths for use with the zip function
app.post("/sendZips", (req, res) => {
  myZip = req.body.sentZip;
  myZip2 = req.body.sentZip;
  res.send(myZip);
});

// Download a file
app.get("/download", (req, res) => {
  var selectedPath = my_path;
  console.log("Download: " + my_path);
  const file = __dirname + selectedPath.substring(1);
  res.sendFile(file);
});

// View a file
app.get("/view", (req, res) => {
  res.sendFile(my_path, { root: __dirname });
});

// Delete selected files and directories
app.post("/delete", (req, res) => {
  var thePath = req.body.sent_path;
  var i = thePath.length;
  thePath.forEach(function (filepath) {
    rimraf(filepath, function (err) {
      i--;
      if (err) {
        console.log(err);
      } else {
        console.log("Delete successful");
      }
    });
  });
  res.sendStatus(200);
});

// Move selected files and directories
app.post("/movefile", (req, res) => {
  var org = req.body.org_path;
  var dest = req.body.dest_path;

  for (var i = org.length - 1; i >= 0; i--) {
    var file = org[i];
    mv(
      file,
      dest + "/" + path.basename(file),
      { mkdrip: true, clobber: false },
      function (err) {
        if (err) throw err;
        console.log("Move complete.");
      }
    );
  }
  console.log(chalk.yellow(org + " ...was moved to... " + dest));
  res.sendStatus(200);
});

// Zip selected files and directories
app.get("/zip", (req, res) => {
  const files = myZip2;
  const archive = archiver("zip");

  archive.on("error", function (err) {
    res.status(500).send({ error: err.message });
  });

  archive.on("end", function () {
    console.log("Zipped %d bytes", archive.pointer());
  });

  res.attachment("archive-name.zip");
  archive.pipe(res);

  for (const i in files) {
    archive.file(files[i], { name: path.basename(files[i]) });

    if (isDir(files[i])) {
      archive.directory(files[i], path.basename(files[i]));
    }
  }
  archive.finalize();
});

// Extract selected .zip file *Please note only .zip files are supported for now
app.post("/extract", (req, res) => {
  var src = req.body.path_name;
  var dest = path.dirname(src);

  async function ext() {
    try {
      await extract(src, { dir: __dirname + "/" + dest });
      console.log("Extraction complete");
    } catch (err) {
      console.log(err)
    }
  }
  ext();
});

