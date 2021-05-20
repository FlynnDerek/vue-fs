const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
const dateFormat = require("dateformat");
const chalk = require("chalk");
const mv = require("mv");
const rimraf = require("rimraf");
const archiver = require("archiver");
const extract = require("extract-zip");

const Date = require("./Utilities/DateTime");

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.listen(port, function () {
	console.log("Server running on port: " + port);
});

let my_path;
let myZip2;
// const my_file1;
let folder_path;

// Responds with the relative path of a selected directory or file
app.post("/sendPath", (req, res) => {
	my_path = req.body.sent_path;
	// my_file1 = req.body.sent_file;
	const isDir = path.dirname(my_path);
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
	const dirPath = "./files/";
	let result = [];
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
	const dirPath = req.body.path_name;
	folder_path = dirPath;
	let result = [];

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
	const { ctime } = fs.statSync(file);
	return dateFormat(ctime, "mm/dd/yy, h:MM TT");
}

// Check if a given path is a directory
function isDir(path) {
	try {
		const stat = fs.lstatSync(path);
		return stat.isDirectory();
	} catch (e) {
		return false;
	}
}

// Create new folder
app.post("/newFolder", (req, res) => {
	const dir = req.body.current_path + "/" + req.body.folder_name;
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
	console.log(
		chalk.green(
			"A new folder `" +
			req.body.folder_name +
			"` was created on " +
			Date.Now()
		)
	);
	return res.sendStatus(200);
});

// Pass the user's selected paths for use with the zip function
app.post("/sendZips", (req, res) => {
	const myZip = req.body.sentZip;
	myZip2 = req.body.sentZip;
	res.send(myZip);
});

// Download a file
app.get("/download", (req, res) => {
	const selectedPath = my_path;
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
	const thePath = req.body.sent_path;
	
	thePath.forEach(function (filepath) {
		rimraf(filepath, function (err) {
			if (err) return console.log(err);
			
			console.log("Delete successful");
		});
	});
	res.sendStatus(200);
});

// Move selected files and directories
app.post("/movefile", (req, res) => {
	const org = req.body.org_path;
	const dest = req.body.dest_path;

	for (let i = org.length - 1; i >= 0; i--) {
		const file = org[i];
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
app.post("/extract", async (req) => {
	const src = req.body.path_name;
	const dest = path.dirname(src);

	try {
		await extract(src, { dir: __dirname + "/" + dest });
		console.log("Extraction complete");
	} catch (err) {
		console.log(err);
	}
});