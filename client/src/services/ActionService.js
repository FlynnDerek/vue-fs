import axios from "axios";
import $ from 'jquery';
import config from "../config.json";
import FileDownload from "js-file-download";

class ActionService {

 upload = async function(files) {
    return axios
      .post(`${config.baseUrl}upload`, {
        files: files,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  downloadSingle = async function(pickedFile) {
    var get = pickedFile;
    axios
      .get(`${config.baseUrl}download`, {
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
      .get(`${config.baseUrl}zip`, {
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
    return axios
      .post(`${config.baseUrl}extract`, {
        path: path,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  sendToZip = async function(filesToSend) {
    return axios
      .post(`${config.baseUrl}sendZips`, {
        sentZip: filesToSend,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  newFolder = async function(currentPath, folderName) {
    return axios
      .post(`${config.baseUrl}newFolder`, {
        currentPath,
        folderName,
      })
      .catch((err) => {
        console.error(err);
      });
  };

  viewFile = async function() {
    return axios
      .get(`${config.baseUrl}view`, {})
      .then(() => {
        window.open(`${config.baseUrl}view`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  move = async function(origin, destination) {
    axios
      .post(`${config.baseUrl}movefile`, {
        origin,
        destination,
      })
      .catch((err) => {
        console.err(err);
      });
  };

  delete = async function(objects) {
    return axios
      .post(`${config.baseUrl}delete`, {
        path: objects,
      })
      .catch((err) => {
        console.err(err);
      });
  };
}

export default ActionService;
