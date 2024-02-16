/* eslint-disable */
// @ts-ignore
import axios from "axios";

class ExtractionService {
  extract = async function(path) {
    axios
      .post("https://766500588.xyz/extract", {
        path_name: path,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
}

export default ExtractionService;
