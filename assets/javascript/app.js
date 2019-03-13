var topics = ["arrested development", "friends tv", "game of thrones", "its always sunny in philadelphia", "modern family"];


// for loop through topics and render buttons
// put it in a function that take array as a parameter
function renderButtons(takeTopicsArray) {

    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < takeTopicsArray.length; i++) {
        var buttonvar = $("<button>");
        buttonvar.addClass("tvShowName");
        buttonvar.attr("data-name", takeTopicsArray[i]);
        buttonvar.text(takeTopicsArray[i]);
        $("#buttons-view").append(buttonvar);
    }
}
//call this function so that the buttons are on there
renderButtons(topics);

// on click listener on the submit form element 
// 1. stop default action
// 2. emtpy div
// 3. if not in array then push
// 4. render all buttons

// on click listener on the buttons
// ajax call
// 
