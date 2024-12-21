import axios from "axios";
import config from "../config.json";

class ExplorerService {
  list = async function(path) {
    return axios
      .get(`${config.baseUrl}list?`, {
        params: {
          path: path,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export default ExplorerService;
