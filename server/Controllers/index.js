const fs = require("fs");
const { cwd } = require("process");
const path = require("path");
const mv = require("mv");
const rimraf = require("rimraf");
const archiver = require("archiver");
const extract = require("extract-zip");
const { Router } = require("express");

const DateTime = require("../Utilities/DateTime");
const Path = require("../Utilities/Path");
const Logger = require("../Utilities/Logger");

const router = Router();

let currentPath;
let directoryPath;
let filesToZip;

// List all files and directories from a selected directory
router.get("/list", (req, res) => {
	const dirPath = req.query.path;
	directoryPath = dirPath;
	let result = [];
	let globalDir;
  
	if (!Path.isDir(dirPath)) globalDir = path.parse(dirPath).dir;
	else globalDir = dirPath;
  
	fs.readdir(globalDir, (err, filesPath) => {
	  if (err) throw err;
	  result = filesPath.map((object) => {
		return {
		  path: `${globalDir}/${object}`,
		  name: object,
		  timestamp: DateTime.lastUpdatedDate(`${globalDir}/${object}`),
		  isDir: Path.isDir(`${globalDir}/${object}`),
		  fileExt: path.extname(`${globalDir}/${object}`),
		};
	  });
	  res.send(
		result.sort((a, b) => {
		  return new Date(b.timestamp) - new Date(a.timestamp);
		})
	  );
	});
  });

// Uploads files to the file directory
router.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  const file = req.files.file;

  file.mv(`${directoryPath}/${file.name}`, (err) => {
    if (err) {
      Logger.Error(err);
      return res.status(500).send({ msg: "Error occured" });
    }
    return res.send({ name: file.name, path: `/${file.name}` });
  });
});

// Create new folder
router.post("/newFolder", (req, res) => {
  const currDir = req.body.currentPath;
  const newDir = `${currDir}/${req.body.folderName}`;

  if (Path.isDir(currDir)) {
    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir);
    }
  } else {
    const cleanDir = `${path.parse(currDir).dir}/${req.body.folderName}`;
    if (!fs.existsSync(cleanDir)) {
      fs.mkdirSync(cleanDir);
    }
  }
  Logger.Event(
    `A new folder '${req.body.folderName}' was created on ${DateTime.Now()}`
  );
  return res.sendStatus(200);
});

// Download a file
router.get("/download", (req, res) => {
  const selectedPath = currentPath;
  Logger.Event(`Download: ${currentPath}`);
  const file = path.join(cwd(), selectedPath.substring(1));
  res.sendFile(file);
});

// View a file
router.get("/view", (req, res) => {
	console.log(res.data)
  res.sendFile(currentPath, { root: cwd() });
});

// Delete selected files and directories
router.post("/delete", (req, res) => {
  const paths = req.body.path;

  paths.forEach((path) => {
    rimraf(path, (err) => {
      if (err) return Logger.Error(err);

      Logger.Event("Delete successful");
    });
  });
  res.sendStatus(200);
});

// Move selected files and directories
router.post("/movefile", (req, res) => {
  const org = req.body.origin;
  const dest = req.body.destination;

  for (let i = org.length - 1; i >= 0; i--) {
    const file = org[i];
    mv(
      file,
      `${dest}/${path.basename(file)}`,
      { mkdrip: true, clobber: false },
      (err) => {
        if (err) throw err;
        Logger.Event("Move complete.");
      }
    );
  }
  Logger.Event(`${org} ...was moved to... ${dest}`);
  res.sendStatus(200);
});

// Zip selected files and directories
router.get("/zip", (req, res) => {
  const files = filesToZip;
  const archive = archiver("zip");

  archive.on("error", (err) => {
    res.status(500).send({ error: err.message });
  });

  archive.on("end", () => {
    Logger.Event("Zipped %d bytes", archive.pointer());
  });

  res.attachment("archive-name.zip");
  archive.pipe(res);

  for (const i in files) {
    archive.file(files[i], { name: path.basename(files[i]) });

    if (Path.isDir(files[i])) {
      archive.directory(files[i], path.basename(files[i]));
    }
  }
  archive.finalize();
});

// Extract selected .zip file *Please note only .zip files are supported for now
router.post("/extract", async (req, res) => {
  const src = req.body.path;
  const dest = path.dirname(src);

  try {
    const dir = path.join(cwd(), dest);
    await extract(src, { dir })
    Logger.Event("Extraction complete");
	res.sendStatus(200);
  } catch (err) {
    Logger.Error(err);
	res.sendStatus(500);
  }
});

module.exports = router;
