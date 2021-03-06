module.exports = function(moment) {
    if (!moment || !moment.isMoment || (typeof moment.isMoment !== 'function')) {
        throw new Error('Input argument "moment" is required and must be type of "Momentjs" type.' + 
            'Use require("moment-precise-range")(moment).');
    }

    var defaults = {
        year: true,
        month: true,
        day: true,
        hour: true,
        minute: true,
        second: true,
        joinSeparator: ' ',
        returnObject: false
    };

    return function preciseDiff(d1, d2, opts) {
        var m1 = moment(d1), m2 = moment(d2);
        opts = opts || defaults;

        if (m1.isSame(m2)) {
            return '';
        }
        if (m1.isAfter(m2)) {
            var tmp = m1;
            m1 = m2;
            m2 = tmp;
        }

        var yDiff = m2.year() - m1.year();
        var mDiff = m2.month() - m1.month();
        var dDiff = m2.date() - m1.date();
        var hourDiff = m2.hour() - m1.hour();
        var minDiff = m2.minute() - m1.minute();
        var secDiff = m2.second() - m1.second();

        if (secDiff < 0) {
            secDiff = 60 + secDiff;
            minDiff--;
        }
        if (minDiff < 0) {
            minDiff = 60 + minDiff;
            hourDiff--;
        }
        if (hourDiff < 0) {
            hourDiff = 24 + hourDiff;
            dDiff--;
        }
        if (dDiff < 0) {
            var daysInLastFullMonth = moment(m2.year() + '-' + (m2.month() + 1), "YYYY-MM")
                .subtract(1, 'months').daysInMonth();
            if (daysInLastFullMonth < m1.date()) { // 31/01 -> 2/03
                dDiff = daysInLastFullMonth + dDiff + (m1.date() - daysInLastFullMonth);
            } else {
                dDiff = daysInLastFullMonth + dDiff;
            }
            mDiff--;
        }
        if (mDiff < 0) {
            mDiff = 12 + mDiff;
            yDiff--;
        }

        var result = [];

        moment.relativeTimeThreshold('s', 60);
        moment.relativeTimeThreshold('m', 60);
        moment.relativeTimeThreshold('h', 23);
        moment.relativeTimeThreshold('dd', 28);
        moment.relativeTimeThreshold('dm', 45);
        moment.relativeTimeThreshold('dy', 365);

        if (yDiff && opts.year) {
            result.push(moment.duration(yDiff, 'year').humanize());
        }
        if (mDiff && opts.month) {
            result.push(moment.duration(mDiff, 'month').humanize());
        }
        if (dDiff && opts.day) {
            result.push(moment.duration(dDiff, 'day').humanize());
        }
        if (hourDiff && opts.hour) {
            result.push(moment.duration(hourDiff, 'hour').humanize());
        }
        if (minDiff && opts.minute) {
            result.push(moment.duration(minDiff, 'minute').humanize());
        }
        if (secDiff && opts.second) {
            result.push(moment.duration(secDiff, 'second').humanize());
        }

        var joinSeparator = opts.joinSeparator || defaults.joinSeparator;
        if (opts.returnObject)
            return {years: moment.duration(yDiff, 'year').asYears(),
                    months: moment.duration(mDiff, 'month').asMonths(),
                    days: moment.duration(dDiff, 'day').asDays(),
                    hours: moment.duration(hourDiff, 'hour').asHours(),
                    minutes: moment.duration(minDiff, 'minute').asMinutes(),
                    seconds: moment.duration(secDiff, 'second').asSeconds(),
                   };

        return result.join(joinSeparator);
    };
};
