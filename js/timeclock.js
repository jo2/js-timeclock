Array.prototype.removeValue = function(name, value){
    var array = $.map(this, function(v,i){
        return v[name] === value ? null : v;
    });
    this.length = 0;
    this.push.apply(this, array);
};

function contains(arr, key, val){
    for (var i = 0; i < arr.length; i++) {
        if(arr[i][key] === val) return true;
    }
    return false;
}

function isBetweeen(o1, o2, o3) {
    var day1 = o1.substring(0, 2), day2 = o2.substring(0, 2), day3 = o3.substring(0, 2);
    var time1 = o1.substring(2), time2 = o2.substring(2), time3 = o3.substring(2);
    if (!(day1 === day2 && day2 === day3)) {
        return false;
    }
    if (time1 <= time2 && time2 <= time3) {
        return true;
    }
    return false;
}

function colorize(start, end, color) {
    if (start.substring(0, 2) !== end.substring(0, 2)) {
        return;
    }
    var id;
    var day = start.substring(0, 2);
    var lstart = parseInt(start.substring(2));
    var lend = parseInt(end.substring(2));

    while (lstart <= lend) {
        if (lstart < 10) {
            id = day + '000' + lstart;
        } else if (lstart < 100) {
            id = day + '00' + lstart;
        } else if (lstart < 1000) {
            id = day + '0' + lstart;
        } else {
            id = day + lstart;
        }
        if (lstart % 100 !== 0) {
            lstart = lstart + 70;
        } else {
            lstart = lstart + 30;
        }
        $('#' + id).css("background-color", color);
    }
}

function formatize(number) {
    if (number < 10) {
        return '000' + number;
    } else if (number < 100) {
        return '00' + number;
    } else if (number < 1000) {
        return '0' + number;
    } else {
        return number;
    }
}

function substractOne(dateTimeParam) {
    var day = dateTimeParam.substring(0, 2), dateTime = dateTimeParam;
    dateTime = parseInt(dateTime.substring(2));
    if (dateTime % 100 !== 0) {
        dateTime = dateTime - 30;
    } else {
        dateTime = dateTime - 70;
    }
    dateTime = formatize(dateTime);
    return day + dateTime;
}

function addOne(dateTimeParam) {
    var day = dateTimeParam.substring(0, 2), dateTime = dateTimeParam;
    dateTime = parseInt(dateTime.substring(2));
    if (dateTime % 100 !== 0) {
        dateTime = dateTime + 70;
    } else {
        dateTime = dateTime + 30;
    }
    dateTime = formatize(dateTime);
    return day + dateTime;
}

function isNeighbourOf(obj1, obj2) {
    var help1 = addOne(obj1.end), help2 = addOne(obj2.end);
    if (help1 === obj2.start) {
        return true;
    } else if (help2 === obj1.start) {
        return true;
    }
    return false;
}

function isBorderOf(obj1, obj2) {
    if (obj1.start === obj2.start && isBetweeen(obj1.start, obj2.end, obj1.end)) {
        return true;
    } else if (obj2.start === obj1.start && isBetweeen(obj2.start, obj1.end, obj2.end)) {
        return true;
    } else if (obj1.end === obj2.end && isBetweeen(obj1.start, obj2.start, obj1.end)) {
        return true;
    } else if (obj2.end === obj1.end && isBetweeen(obj2.start, obj1.start, obj2.end)) {
        return true;
    } else {
        return false;
    }
}

function overlaps(obj1, obj2) {
    if (isBetweeen(obj1.start, obj2.start, obj1.end) && !isBetweeen(obj1.start, obj2.end, obj1.end)) {
        return true;
    } else if (isBetweeen(obj2.start, obj1.start, obj2.end) && !isBetweeen(obj2.start, obj1.end, obj2.end)) {
        return true;
    }
    return false;
}

$(document).ready(function() {
    var container = $('#timeclock-container');
    var table = document.createElement("table");
    var html = "<table id='timeclock'><tr>" +
        "<th style='border: none;'></th>" +
        "<th colspan='4'>00:00</th>" +
        "<th colspan='4'>02:00</th>" +
        "<th colspan='4'>04:00</th>" +
        "<th colspan='4'>06:00</th>" +
        "<th colspan='4'>08:00</th>" +
        "<th colspan='4'>10:00</th>" +
        "<th colspan='4'>12:00</th>" +
        "<th colspan='4'>14:00</th>" +
        "<th colspan='4'>16:00</th>" +
        "<th colspan='4'>18:00</th>" +
        "<th colspan='4'>20:00</th>" +
        "<th colspan='4'>22:00</th>" +
        "</tr>";

    var days = ["mo", "tu", "we", "th", "fr", "sa", "su"];
    var longDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for (var i = 0; i < days.length; i++) {
        html += "<tr><td class=\"head\">" + longDays[i] + "</td><td id='" + days[i] + "0000'></td><td id='" + days[i] + "0030'></td><td id='" + days[i] + "0100'></td><td id='" + days[i] + "0130'></td><td id='" + days[i] + "0200'></td><td id='" + days[i] + "0230'></td><td id='" + days[i] + "0300'></td><td id='" + days[i] + "0330'></td><td id='" + days[i] + "0400'></td><td id='" + days[i] + "0430'></td><td id='" + days[i] + "0500'></td><td id='" + days[i] + "0530'></td><td id='" + days[i] + "0600'></td><td id='" + days[i] + "0630'></td><td id='" + days[i] + "0700'></td><td id='" + days[i] + "0730'></td><td id='" + days[i] + "0800'></td><td id='" + days[i] + "0830'></td><td id='" + days[i] + "0900'></td><td id='" + days[i] + "0930'></td><td id='" + days[i] + "1000'></td><td id='" + days[i] + "1030'></td><td id='" + days[i] + "1100'></td><td id='" + days[i] + "1130'></td><td id='" + days[i] + "1200'></td><td id='" + days[i] + "1230'></td><td id='" + days[i] + "1300'></td><td id='" + days[i] + "1330'></td><td id='" + days[i] + "1400'></td><td id='" + days[i] + "1430'></td><td id='" + days[i] + "1500'></td><td id='" + days[i] + "1530'></td><td id='" + days[i] + "1600'></td><td id='" + days[i] + "1630'></td><td id='" + days[i] + "1700'></td><td id='" + days[i] + "1730'></td><td id='" + days[i] + "1800'></td><td id='" + days[i] + "1830'></td><td id='" + days[i] + "1900'></td><td id='" + days[i] + "1930'></td><td id='" + days[i] + "2000'></td><td id='" + days[i] + "2030'></td><td id='" + days[i] + "2100'></td><td id='" + days[i] + "2130'></td><td id='" + days[i] + "2200'></td><td id='" + days[i] + "2230'></td><td id='" + days[i] + "2300'></td><td id='" + days[i] + "2330'></td></tr><tr class='separator'><td colspan='49' class='separator-cell'></td></tr>";
    }
    html += "</table>";
    container.first().after(html);

    var toRemove = [], toAdd = [];
    var field = $('#timeclockInput');
    var timeclock;
    //load array
    if (field.val() === null || field.val() === '') {
        timeclock = [];
    } else {
        timeclock = JSON.parse(field.val());
        console.log(JSON.parse(field.val()));
        for (var a = 0; a < timeclock.length; a++) {
            colorize(timeclock[a].start, timeclock[a].end, "lightblue");
        }
        //field.val(JSON.stringify(timeclock));
    }

    $('#timeclock').on('mousedown', function(e) {
        if ($(e.target).hasClass('separator-cell')) {
            return;
        }
        var start, end, day, bool;
        start = e.target.id;
        $('#' + start).css("background-color", "lightgreen");
        $('#timeclock').on('mouseup', function(e) {
            end = e.target.id;
            if (start !== null && end !== null) {
                day = start.substring(0, 2);
                var removed = false;

                //check if selection contains array entries: for every entry
                for (var j = 0; j < timeclock.length; j++) {
                    //check if entry is on the same day
                    if (timeclock[j].start.substring(0,2) === day) {

                        //check if current entry is the current selection
                        if (start === timeclock[j].start && end === timeclock[j].end) {
                            toRemove.push({start: timeclock[j].start, end: timeclock[j].end});
                            removed = true;
                        }
                        //check if current entry is between the current selection
                        if (isBetweeen(start, timeclock[j].start, end) && isBetweeen(start, timeclock[j].end, end)) {
                            //remove entry
                            toRemove.push({start: timeclock[j].start, end: timeclock[j].end});
                        }
                        //check if the current selection is between an entry
                        else if (isBetweeen(timeclock[j].start, start, timeclock[j].end) && isBetweeen(timeclock[j].start, end, timeclock[j].end) && !isBorderOf(timeclock[j], {start: start, end: end})) {
                            //split entry in two
                            var tmpstart1 = timeclock[j].start, tmpstart2 = addOne(end), tmpend1 = substractOne(start), tmpend2 = timeclock[j].end;
                            toRemove.push({start: timeclock[j].start, end: timeclock[j].end});

                            //set mark that the selection is not to be added
                            removed = true;
                            toAdd.push({start: tmpstart1, end: tmpend1});
                            toAdd.push({start: tmpstart2, end: tmpend2});
                        }
                        //check if there are neighbours to connect them
                        else if (isNeighbourOf(timeclock[j], {start: start, end: end})) {
                            //merge neighbouring object with selection
                            removed = true;
                            toRemove.push({start: timeclock[j].start, end: timeclock[j].end});
                            if (parseInt(timeclock[j].start.substring(2)) < parseInt(start.substring(2))) {
                                toAdd.push({start: timeclock[j].start, end: end});
                            } else if (parseInt(timeclock[j].start.substring(2)) > parseInt(start.substring(2))) {
                                toAdd.push({start: start, end: timeclock[j].end});
                            }
                        }
                        //check if selection shortens current entry
                        else if (isBorderOf(timeclock[j], {start: start, end: end})) {
                            toRemove.push({start: timeclock[j].start, end: timeclock[j].end});
                            removed = true;

                            //check if selection is on left border
                            if (timeclock[j].start === start) {
                                toAdd.push({start: addOne(end), end: timeclock[j].end});
                            }
                            //check if selection is on right border
                            else if (timeclock[j].end === end) {
                                toAdd.push({start: timeclock[j].start, end: substractOne(start)});
                            }
                        }
                    }
                }
                for (var i = 0; i < toRemove.length; i++) {
                    colorize(toRemove[i].start, toRemove[i].end, "white");
                    timeclock.removeValue('start', toRemove[i].start);
                }
                for (var k = 0; k < toAdd.length; k++) {
                    //if the current object has not been removed
                    if (toAdd[k] !== -1) {
                        //if there are more than two objects left
                        if (toAdd.length > k + 1) {
                            // if these objects are overlapping
                            if (overlaps(toAdd[k + 1], toAdd[k])) {
                                //merge the current and the following object
                                if (parseInt(toAdd[k + 1].start.substring(2)) < parseInt(toAdd[k].start.substring(2))) {
                                    colorize(toAdd[k + 1].start, toAdd[k].end, "lightgreen");
                                    timeclock.push({start: toAdd[k + 1].start, end: toAdd[k].end});
                                } else if (parseInt(toAdd[k + 1].start.substring(2)) > parseInt(toAdd[k].start.substring(2))) {
                                    colorize(toAdd[k].start, toAdd[k + 1].end, "lightgreen");
                                    timeclock.push({start: toAdd[k].start, end: toAdd[k + 1].end});
                                }
                                //remove the following object from toAdd list
                                toAdd[k + 1] = -1;
                                continue;
                            }
                        }
                        colorize(toAdd[k].start, toAdd[k].end, "lightgreen");
                        timeclock.push({start: toAdd[k].start, end: toAdd[k].end});

                    }
                }
                toRemove = [];
                toAdd = [];

                if (!removed) {
                    if (start.substring(0, 2) === end.substring(0, 2)) {
                        //add to array
                        colorize(start, end, "lightgreen");
                        timeclock.push({start: start, end: end});
                        bool = 2;
                    }
                }
                end = null;
                start = null;
                field.val(JSON.stringify(timeclock));
            } else {
                bool = 1;
            }
        });
        if (bool === 1) {
            $('#' + start).css("background-color", "white");
        }
    });
});