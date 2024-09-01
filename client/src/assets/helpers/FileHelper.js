class FileHelper {
  isAFile = function(fileName) {
    var isFile = fileName.substr(fileName.lastIndexOf("/") + 1);

    if (isFile.indexOf(".") !== -1) {
      return true;
    } else {
      return false;
    }
  };

  removeFileNameFromDirPath = function(path) {
	return path.substring(0, path.lastIndexOf("/"));
  }
}

export default FileHelper;
