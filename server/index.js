const fs = require("fs");
const path = require("path");
const mv = require("mv");
const rimraf = require("rimraf");
const archiver = require("archiver");
const extract = require("extract-zip");

const DateTime = require("./Utilities/DateTime");
const app = require("./Utilities/Server");
const Path = require("./Utilities/Path");
const Logger = require("./Utilities/Logger");

const port = process.env.PORT || 5000;

app.listen(port, () => {
	Logger.System(`Server running on port: ${port}`);
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

	myFile.mv(`${folder_path}/${myFile.name}`, (err) => {
		if (err) {
			Logger.Error(err);
			return res.status(500).send({ msg: "Error occured" });
		}
		return res.send({ name: myFile.name, path: `/${myFile.name}` });
	});
});

// List all sub-directories in the 'files' directory.
app.post("/getAllMainFolders", (req, res) => {
	const dirPath = "./files/";
	let result = [];
	fs.readdir(dirPath, (err, filesPath) => {
		if (err) throw err;
		result = filesPath.map((filePath) => {
			return `${dirPath}${filePath}`;
		});
		res.send(result);
	});
});

// List all files and directories from a selected directory
app.post("/getAllFilesFromSelectedFolder", (req, res) => {
	const dirPath = req.body.path_name;
	folder_path = dirPath;
	let result = [];

	fs.readdir(dirPath, (err, filesPath) => {
		if (err) throw err;
		result = filesPath.map((filePath) => {
			return {
				paths: `${dirPath}/${filePath}`,
				names: filePath,
				the_time: DateTime.lastUpdatedDate(`${dirPath}/${filePath}`),
				is_dir: Path.isDir(`${dirPath}/${filePath}`),
				fileExt: path.extname(`${dirPath}/${filePath}`),
			};
		});
		res.send(
			result.sort((a, b) => {
				return new Date(b.the_time) - new Date(a.the_time);
			})
		);
	});
});

// Create new folder
app.post("/newFolder", (req, res) => {
	const dir = `${req.body.current_path}/${req.body.folder_name}`;
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
	Logger.Event(
		`A new folder '${req.body.folder_name}' was created on ${DateTime.Now()}`
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
	Logger.Event(`Download: ${my_path}`);
	const file = `${__dirname}${selectedPath.substring(1)}`;
	res.sendFile(file);
});

// View a file
app.get("/view", (req, res) => {
	res.sendFile(my_path, { root: __dirname });
});

// Delete selected files and directories
app.post("/delete", (req, res) => {
	const thePath = req.body.sent_path;
	
	thePath.forEach((filepath) => {
		rimraf(filepath, (err) => {
			if (err) return Logger.Error(err);
			
			Logger.Event("Delete successful");
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
app.get("/zip", (req, res) => {
	const files = myZip2;
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
app.post("/extract", async (req) => {
	const src = req.body.path_name;
	const dest = path.dirname(src);

	try {
		await extract(src, { dir: `${__dirname}/${dest}` });
		Logger.Event("Extraction complete");
	} catch (err) {
		Logger.Error(err);
	}
});
