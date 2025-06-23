class FileHelper {
  isAFile = function(fileName) {
    var isFile = fileName.substr(fileName.lastIndexOf("/") + 1);

    if (isFile.indexOf(".") !== -1) {
      return true;
    } else {
      return false;
    }
  };

  getObjectNameFromPath = function(path) {
	return path.split('\\').pop().split('/').pop();
  }
}

export default FileHelper;
