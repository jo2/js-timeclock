# js-timeclock
This is a Javascript timeclock to choose amounts of time during the week.
![Example Image](https://raw.githubusercontent.com/jo2/js-timeclock/readme/resources/timeclock.PNG)
# how to use?
include timeclock.min.js and timeclock.min.css into your page.
you need the following html elements in your page:
```
<input id="timeclockInput" style="width: 1000px">
<div id="timeclock-container"></div>
```
you´ll likely want to hide the input element.
# json structure
```
[
    {"start":"tu0630","end":"tu1130"},
    ...
]
```
# other
if you have any ideas to improve this or you notice any bugs feel free to create an issue.