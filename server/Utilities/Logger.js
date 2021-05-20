const debug = require("debug");

const DateTime = require("./DateTime");

const logSystem = debug("vue-fs:system");
const logEvent = debug("vue-fs:event");
const logError = debug("vue-fs:error");
const logWarn = debug("vue-fs:warn");

class Logger {

	static System(log) {
		logSystem("\x1b[36m%s\x1b[0m", log, `- ${DateTime.Now()}`);
	}
    
	static Event(log) {
		logEvent(log, `- ${DateTime.Now()}`);
	}
    
	static Warn(log) {
		logWarn("\x1b[33m%s\x1b[0m", log, `- ${DateTime.Now()}`);
	}
	
	static Error(log) {
		logError("\x1b[31m%s\x1b[0m", log, `- ${DateTime.Now()}`);
	}
}

module.exports = Logger;