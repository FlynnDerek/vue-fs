const debug = require("debug");

const logSystem = debug("vue-fs:system");
const logEvent = debug("vue-fs:event");
const logError = debug("vue-fs:error");
const logWarn = debug("vue-fs:warn");


module.exports = {
	logSystem,
	logEvent,
	logError,
	logWarn
};