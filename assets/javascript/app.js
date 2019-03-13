var topics = ["arrested development", "friends tv", "game of thrones", "its always sunny in philadelphia", "modern family"];


// for loop through topics and render buttons
// put it in a function that take array as a parameter
function renderButtons(takeTopicsArray) {

    $("#buttons-view").empty();

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
// 2. if not in array then push
// 3. render all buttons
$("#add-tv").on("click", function(event){
    event.preventDefault();

    //get text from the text box
    var tv = $("#tv-input").val().trim();
    
    //check if tv show exists in the array already
    if (topics.includes(tv)==false){
        topics.push(tv);
    }

    renderButtons(topics);
});

// on click listener on the buttons
// ajax call
// 
