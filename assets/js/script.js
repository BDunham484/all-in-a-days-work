
//display the daye and day in the heading
var day = moment().format('dddd, MMMM Do');
$("#currentDay").text(day);


var workHoursIdArr = ["#nine", "#ten", "#eleven", "#twelve", "#one", "#two", "#three", "#four", "#five"];
var workHoursClassArr = [".nine", ".ten", ".eleven", ".twelve", ".one", ".two", ".three", ".four", ".five"];


var checkTime = function() {
    // debugger
    if (moment().isAfter(blockTimeStart) && moment().isBefore(blockTimeEnd)) {
        console.log("present");
        $(hoursId).addClass("present");
    } else if (moment().isAfter(blockTimeEnd)) {
        console.log("after");
        $(hoursId).addClass("past");
    } else if (moment().isBefore(blockTimeStart)) {
        console.log("before");
        $(hoursId).addClass("future");
    }
}


for (var i = 0; i < workHoursIdArr.length; i++) {
    var hoursId = workHoursIdArr[i];
    var hoursClass = workHoursClassArr[i];
    if ($("hoursId")) {
        var time = $(hoursClass).text();
        console.log(time);
        if (time.length === 4) {
            var hourNumA = $(hoursClass).text().charAt(0);
            var hourNumB = $(hoursClass).text().charAt(1);
            var hour = hourNumA + hourNumB;
        } else {
            var hour = $(hoursClass).text().charAt(0);
        }
        console.log(hour);
        var aOrPIndex = time.length - 2;
        console.log(aOrPIndex);
        var aOrP = time.charAt(aOrPIndex);
        console.log(aOrP);
        var blockTimeStart = moment(day + " " + hour + ":00:00 " + aOrP + "M", "dddd, MMMM Do, h:mm:ss a");
        console.log(blockTimeStart);
        var blockTimeEnd = moment(day + " " + hour + ":59:59 " + aOrP + "M", "dddd, MMMM Do, h:mm:ss a");
        console.log(blockTimeEnd);
        checkTime();
    }
}
