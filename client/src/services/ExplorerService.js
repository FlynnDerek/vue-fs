import axios from "axios";
import config from "../config.json";

class ExplorerService {
  getExplorerFolders = async function() {
    return axios
      .post(`${config.apiRoot}getAllMainFolders`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getContentsFromSelected = async function(path) {
    return axios
      .post(`${config.apiRoot}getAllFilesFromSelectedFolder`, {
        path: path,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  sendPath = async function(path) {
    return axios
      .post(`${config.apiRoot}sendPath`, {
        path: path,
      })
      .then(async (response) => {
        return response;
      });
  };
}

export default ExplorerService;
