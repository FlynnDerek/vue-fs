const { cwd } = require("process");
const debug = require("debug");

const logError = debug("vue-fs:exit");

class ExitHandler {
	static cleanupHandler() {
		logError("No cleanup handler subscription.");
	}

	static Setup() {
		process.on("uncaughtException", (err) => {
			const error = (err ? err.stack || err : "").toString();
			const errorMsg = this.CleanPath(error);
			this.Terminate(1, errorMsg);
		});

		process.on("unhandledRejection", (err) => {
			const errorMsg = `Uncaught Promise error: \n${this.CleanPath(err.stack)}`;
			this.Terminate(1, errorMsg);
		});

		process.on("SIGTERM", () => {
			const errorMsg = `Process ${process.pid} received a SIGTERM signal`;
			this.Terminate(0, errorMsg);
		});

		process.on("SIGINT", () => {
			const errorMsg = `Process ${process.pid} has been interrupted`;
			this.Terminate(0, errorMsg);
		});
	}

	static Configure(cleanup) {
		this.cleanupHandler = cleanup;
	}

	static CleanPath(message) {
		if (message === undefined)
			return "";

		const root = cwd();
		const path = root.replace(/\\/g, "\\\\");
		const regex = new RegExp(`${path}\\\\`, "mg");
		return message.replace(regex, ".\\");
	}

	static async Terminate(code, message) {
		// Exit function
		const exit = () => {
			process.exit(code);
		};

		logError(message);

		// exit if cleanup takes too long
		setTimeout(exit, 500).unref();

		// Attempt a graceful shutdown
		if (this.cleanupHandler != undefined) {
			await this.cleanupHandler();
		}

		exit();
	}
}

module.exports = ExitHandler;