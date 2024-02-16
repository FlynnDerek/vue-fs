/* eslint-disable */
// @ts-ignore
import FileDownload from "js-file-download";
import axios from "axios";
import $ from "jquery";

class DownloadService {
  downloadSingleFile = async function(pickedFile) {
    var get = pickedFile;
    axios
      .get("https://766500588.xyz/download", {
        responseType: "blob",
      })
      .then((response) => {
        FileDownload(response.data, get);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  downloadMultiple = async function() {
    axios
      .get("https://766500588.xyz/zip", {
        responseType: "blob",
      })
      .then((response) => {
        FileDownload(response.data, new Date().toLocaleString() + ".zip");
        $("#fileTable input:checkbox").prop("checked", false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export default DownloadService;
