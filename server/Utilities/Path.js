const fs = require("fs");

class Path {
	// Check if a given path is a directory
	static isDir(path) {
		try {
			const stat = fs.lstatSync(path);
			return stat.isDirectory();
		} catch (e) {
			return false;
		}
	}
}

module.exports = Path;