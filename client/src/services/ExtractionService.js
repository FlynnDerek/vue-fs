/* eslint-disable */
// @ts-ignore
import axios from "axios";

class ExtractionService {
  extract = async function(path) {
    axios
      .post("http://localhost:5000/extract", {
        path_name: path,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
}

export default ExtractionService;
