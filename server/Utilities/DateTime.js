class DateTime {

    static Now() {

        const _now = new Date();

        const time = Intl.DateTimeFormat('en', { hour: 'numeric' }).format(_now);

        const _Date = _now.toLocaleDateString(
            'en-gb',
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'utc'
            }
        );

        return(`${_Date}: ${time}`)
    }
}

module.exports = DateTime;