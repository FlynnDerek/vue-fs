import axios from "axios";
import $ from 'jquery';
import config from "../config.json";
import FileDownload from "js-file-download";

class ActionService {
  downloadSingle = async function(pickedFile) {
    var get = pickedFile;
    axios
      .get(`${config.apiRoot}download`, {
        responseType: "blob",
      })
      .then((response) => {
        FileDownload(response.data, get);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  downloadMultiple = async function() {
    axios
      .get(`${config.apiRoot}zip`, {
        responseType: "blob",
      })
      .then((response) => {
        FileDownload(response.data, new Date().toLocaleString() + ".zip");
        $("#fileTable input:checkbox").prop("checked", false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  extract = async function(path) {
    axios
      .post(`${config.apiRoot}extract`, {
        path: path,
      })
      .catch((err) => {
        console.error(err);
      });
  };

  sendToZip = async function(filesToSend) {
    return axios
      .post(`${config.apiRoot}sendZips`, {
        sentZip: filesToSend,
      })
      .then((respsonse) => {
        return respsonse.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  newFolder = async function(currentPath, folderName) {
    return axios
      .post(`${config.apiRoot}newFolder`, {
        currentPath,
        folderName,
      })
      .catch((err) => {
        console.error(err);
      });
  };

  viewFile = async function() {
    return axios
      .get(`${config.apiRoot}view`, {})
      .then(() => {
        window.open(`${config.apiRoot}view`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  move = async function(origin, destination) {
    axios
      .post(`${config.apiRoot}movefile`, {
        origin,
        destination,
      })
      .catch((err) => {
        console.err(err);
      });
  };

  delete = async function(files) {
    return axios
      .post(`${config.apiRoot}delete`, {
        path: files,
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export default ActionService;
