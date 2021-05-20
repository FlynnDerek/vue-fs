const { Config } = require("./Utilities/Config");
const Logger = require("./Utilities/Logger");
const app = require("./Controllers");

const port = Config.PORT;

app.listen(port, () => {
	Logger.System(`Server running on port: ${port}`);
});