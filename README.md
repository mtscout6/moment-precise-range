# moment-precise-range

A moment.js plugin to display human readable date/time ranges with precision.

## Installation

```
npm install moment-precise-range --save
```

## Usage

```
// Will be the moment return by the moment module, with preciseDiff appended
var moment = require('moment-precise-rage');

var result = moment.preciseDiff(moment('2013-10-21 10:15:40', 'YYYY-MM-DD HH:mm:ss'),
                                moment('2014-02-02 01:01:01', 'YYYY-MM-DD HH:mm:ss'));

console.log(result); // 3 months 11 days 14 hours 45 minutes a few seconds
```
