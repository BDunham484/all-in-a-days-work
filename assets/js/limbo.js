var checkTime = function(start, end, id) {
    if (moment(new Date()).isAfter(start) && moment(new Date()).isBefore(end)) {
        $(id).addClass("present");
        console.log(moment(new Date()))
    } else if (moment(new Date()).isAfter(end)) {
        $(id).addClass("past");
        // console.log("past")
    } else if (moment(new Date()).isBefore(start)) {
        $(id).addClass("future");
        // console.log("future")
    }
}









var blockTimeStart = moment(hour + ":00:00 " + aOrP + "M", "h:mm:ss a");
            // console.log(blockTimeStart)
            //creates a moment based on the end time of each time-block
            var blockTimeEnd = moment(hour + ":59:59 " + aOrP + "M", "h:mm:ss a");
            // console.log(blockTimeEnd)






            checkTime(blockTimeStart, blockTimeEnd, hoursId);