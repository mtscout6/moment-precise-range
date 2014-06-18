(function(moment) {

	moment.fn.preciseDiff = function(d2) {
		return moment.preciseDiff(this, d2);
	};
	moment.preciseDiff = function(d1, d2) {

		var m1 = moment(d1), m2 = moment(d2);
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

		var result = [];

		var originalRelative = {};
		originalRelative.s = moment.relativeTimeThreshold('s');
		originalRelative.m = moment.relativeTimeThreshold('m');
		originalRelative.h = moment.relativeTimeThreshold('h');
		originalRelative.dd = moment.relativeTimeThreshold('dd');
		originalRelative.dm = moment.relativeTimeThreshold('dm');
		originalRelative.dy = moment.relativeTimeThreshold('dy');

		moment.relativeTimeThreshold('s',60);
		moment.relativeTimeThreshold('m',60);
		moment.relativeTimeThreshold('h',23);
		moment.relativeTimeThreshold('dd',28);
		moment.relativeTimeThreshold('dm',45);
		moment.relativeTimeThreshold('dy',365);

		if (yDiff) {
			result.push(moment.duration(yDiff,'year').humanize());
		}
		if (mDiff) {
			result.push(moment.duration(mDiff,'month').humanize())
		}
		if (dDiff) {
			result.push(moment.duration(dDiff,'day').humanize());
		}
		if (hourDiff) {
			result.push(moment.duration(hourDiff,'hour').humanize());
		}
		if (minDiff) {
			result.push(moment.duration(minDiff,'minute').humanize());
		}
		if (secDiff) {
			result.push(moment.duration(secDiff,'second').humanize());
		}

		moment.relativeTimeThreshold('s',originalRelative.s);
		moment.relativeTimeThreshold('m',originalRelative.m);
		moment.relativeTimeThreshold('h',originalRelative.h);
		moment.relativeTimeThreshold('dd',originalRelative.dd);
		moment.relativeTimeThreshold('dm',originalRelative.dm);
		moment.relativeTimeThreshold('dy',originalRelative.dy);

		return result.join(' ');
	};

}(moment));
