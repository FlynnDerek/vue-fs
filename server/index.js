require("dotenv").config();

const ExitHandler = require("./Utilities/ExitHandler");
const Server = require("./Utilities/Server");

const start = async () => {
	ExitHandler.Setup();

	await Server.Setup();

	ExitHandler.Configure(async () => {
		await Server.Close();
	});
};

start();