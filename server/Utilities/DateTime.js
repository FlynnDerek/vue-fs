const dateFormat = require("dateformat");
const fs = require("fs");

class DateTime {

	static Time(now) {
		return Intl.DateTimeFormat("en", { hour: "numeric", minute: "numeric", hour12: true }).format(now);
	}

	static Now() {

		const _now = new Date();
		const time = DateTime.Time(_now);

		const _Date = _now.toLocaleDateString(
			"en-us",
			{
				year: "numeric",
				month: "long",
				day: "numeric",
				timeZone: "utc"
			}
		);

		return(`${_Date} ${time}`);
	}

	// Format the last time a file was edited/created
	static lastUpdatedDate(file) {
		const { ctime } = fs.statSync(file);
		return dateFormat(ctime, "mm/dd/yy, h:MM TT");
	}
}

module.exports = DateTime;