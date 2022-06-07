
//display the day and day in the heading
var day = moment().format('dddd, MMMM Do');
$("#currentDay").text(day);

//create array that houses all of the work hour ID's
var workHoursIdArr = ["#nine", "#ten", "#eleven", "#twelve", "#one", "#two", "#three", "#four", "#five"];
//create array that houses all of the work hour classes
var workHoursClassArr = [".nine", ".ten", ".eleven", ".twelve", ".one", ".two", ".three", ".four", ".five"];
//create array to store saved event id'z
var savedEvents = ["nine", "ten", "eleven", "twelve", "one", "two", "three", "four", "five"];





//function that iterates over two arrays to ultimately create two variables that portray the start and end of each time block's hour and then pass them to checkTime()
var createMoments = function() {
    for (var i = 0; i < workHoursIdArr.length; i++) {
        //iterate through arrays
        var hoursId = workHoursIdArr[i];
        var hoursClass = workHoursClassArr[i];
        //conditional that captres the start and end time of each time block and creates moments for both times
        if ($("hoursId")) {
            //captures the time text assigned to each block
            var time = $(hoursClass).text();
            //if statement that captures the hour (numerical only) of each time block 
            if (time.length === 4) {
                var hourNumA = $(hoursClass).text().charAt(0);
                var hourNumB = $(hoursClass).text().charAt(1);
                var hour = hourNumA + hourNumB;
            } else {
                var hour = $(hoursClass).text().charAt(0);
            }
            //captures the index of A or P (am or pm)
            var aOrPIndex = time.length - 2;
            //captures the "A" or "P" (am or pm) using the previously captured index
            var aOrP = time.charAt(aOrPIndex);
            //creates a moment based on the start time of each time-block
            var blockTimeStart = moment(hour + ":00:00 " + aOrP + "M", "h:mm:ss a");
            console.log(blockTimeStart)
            //creates a moment based on the end time of each time-block
            var blockTimeEnd = moment(hour + ":59:59 " + aOrP + "M", "h:mm:ss a");
            console.log(blockTimeEnd)
            //function call
            checkTime(blockTimeStart, blockTimeEnd, hoursId);
        };
    };
};





//create function that checks to see if the current moment is before, after, or present(during) the current time block
var checkTime = function(start, end, id) {
    if (moment().isAfter(start) && moment().isBefore(end)) {
        $(id).addClass("present");
    } else if (moment().isAfter(end)) {
        $(id).addClass("past");
    } else if (moment().isBefore(start)) {
        $(id).addClass("future");
    }
}





//creates a textarea when a time block is clicked
$(".row").on("click", ".time-block", function() {
    console.log(".time-block has been clicked");
    //capture any previous text
    var text = $(this)
        .text()
        .trim();
    //capture the id attribute
    var divId = $(this)
        .attr("id");
     //create and capture a textarea with a class of .form-control and assign it's value to be the previously captured text
    var textInput = $("<textarea>")
        .addClass("form-control")
        .addClass("col-10")
        .val(text);
    //replace the <p> elemnet with the new <textarea>
    $(this).replaceWith(textInput);
    //automatically highlight the <textarea> for editing
    textInput.trigger("focus");
});





//sets a click event on the save button.  When pressed it saves the current text or lock of to local storage.
$(".saveBtn").on("click", function() {
    //capture the parent's id attribute
    var rowId = $(this)
    .parent(".row")
    .attr("id")
    // capture the parent's id attribute and edit it to recreate the current div ID
    var divId = $(this)
    .parent(".row")
    .attr("id")
    .replace("row-", "");
    //run conditional to determine whether time-block is in focus or not (has div or textarea as 2nd child of parent row)
    if ($("#" + rowId).children().eq(1).is("div")) {
         //capture the textares's current value/text
        var text = $("#" + divId)
        .text()
        .trim();
        // saveEvents(text);
        localStorage.setItem("event: " + divId, JSON.stringify(text));
        // //re-run createMoments()
        createMoments();
    } else {
         //automatically deselect the <textarea>
        $("textarea").trigger("blur");
        //capture the textares's current value/text
        var text = $(".form-control")
        .val()
        .trim();
        //recreate <div>, adding classes, Id, and text
        var taskDiv = $("<div>")
            .addClass("col")
            .addClass("col-10")
            .addClass("time-block")
            .attr("id", divId)
            .text(text);
        //replace textarea with <div>
        $(".form-control").replaceWith(taskDiv);
        // saveEvents(text);
        localStorage.setItem("event: " + divId, JSON.stringify(text));
        //re-run createMoments()
        createMoments();
    };
});





//load saves from localStorage and assign them to the text values of the appropriate div's
var loadSaves = function() {
    // iterate through all items in local storage and apply to appropriate id's
    for (var i = 0; i < savedEvents.length; i++) {
        events = JSON.parse(localStorage.getItem("event: " + savedEvents[i]));

        $("#" + savedEvents[i]).text(events);
    };
};





// // remove all tasks
$("#clear-all").on("click", function() {
    //loop through all saves in localStorage and change them to an empty string
    for (var i = 0; i < savedEvents.length; i++) {
        localStorage.setItem("event: " + savedEvents[i], JSON.stringify(""));
    }
    //refresh browser and update text for each time block
    window.location.reload();
});




//createMoments function call
createMoments();
//loadSaves function call
loadSaves();
//reloads the page every minute
setInterval(function() {  
    window.location.reload();
    // createMoments();
    // console.log("Re-Running createMoments()")
}, (1000 * 60));