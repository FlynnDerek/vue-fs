const dateFormat = require("dateformat");
const fs = require("fs");

class DateTime {

	static Now() {

		const _now = new Date();

		const time = Intl.DateTimeFormat("en", { hour: "numeric" }).format(_now);

		const _Date = _now.toLocaleDateString(
			"en-gb",
			{
				year: "numeric",
				month: "long",
				day: "numeric",
				timeZone: "utc"
			}
		);

		return(`${_Date}: ${time}`);
	}

	// Format the last time a file was edited/created
	static lastUpdatedDate(file) {
		const { ctime } = fs.statSync(file);
		return dateFormat(ctime, "mm/dd/yy, h:MM TT");
	}
}

module.exports = DateTime;