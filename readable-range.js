(function(moment) {
	var relativeTime = moment.fn.lang()._relativeTime;

	var STRINGS = {
		nodiff: '',
		year: relativeTime.y || 'a year',
		years: relativeTime.yy.replace(/%d/i, '') || 'years',
		month: relativeTime.M || 'a month',
		months: relativeTime.MM.replace(/%d/i, '') || 'months',
		day: relativeTime.d || 'a day',
		days: relativeTime.dd.replace(/%d/i, '') || 'days',
		hour: relativeTime.h || 'an hour',
		hours: relativeTime.hh.replace(/%d/i, '') || 'hours',
		minute: relativeTime.m || 'a minute',
		minutes: relativeTime.mm.replace(/%d/i, '') || 'minutes',
		second: relativeTime.s || 'a second',
		seconds: relativeTime.s || 'seconds',
		delimiter: ' '
	};
	moment.fn.preciseDiff = function(d2) {
		return moment.preciseDiff(this, d2);
	};
	moment.preciseDiff = function(d1, d2) {
		relativeTime = moment.fn.lang()._relativeTime;

		var m1 = moment(d1), m2 = moment(d2);
		if (m1.isSame(m2)) {
			return STRINGS.nodiff;
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
			var daysInLastFullMonth = moment(m2.year() + '-' + (m2.month() + 1), "YYYY-MM").subtract('months', 1).daysInMonth();
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

		function pluralize(num, word) {
			// use monent relative time concept
			// use a instead of 1, eg. '1 month' -> 'a month'
			// don't show exact seconds
			return num === 1 ? STRINGS[word] : (word === 'second' ? STRINGS[word] : (num + STRINGS[word + 's']));
		}
		var result = [];

		if (yDiff) {
			result.push(pluralize(yDiff, 'year'));
		}
		if (mDiff) {
			result.push(pluralize(mDiff, 'month'));
		}
		if (dDiff) {
			result.push(pluralize(dDiff, 'day'));
		}
		if (hourDiff) {
			result.push(pluralize(hourDiff, 'hour'));
		}
		if (minDiff) {
			result.push(pluralize(minDiff, 'minute'));
		}
		if (secDiff) {
			result.push(pluralize(secDiff, 'second'));
		}

		return result.join(STRINGS.delimiter);
	};
}(moment));
