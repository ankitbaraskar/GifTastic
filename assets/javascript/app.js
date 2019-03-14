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
$("#add-tv").on("click", function (event) {
    event.preventDefault();

    //get text from the text box
    var tv = $("#tv-input").val().trim();

    //check if tv show exists in the array already
    if (topics.includes(tv) == false) {
        topics.push(tv);
    }

    renderButtons(topics);
});

// on click listener on the buttons
// ajax call
// 
$("button").on("click", function () {

    var searchtv = $(this).attr("data-name");
    console.log(searchtv);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchtv + "&api_key=obrCpu0efOsCa5DrJgBmhBewTGDBxXHh&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
            
            var results = response.data;
            console.log(results);

            
            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    
                    var gifDiv = $("<div>");

                    var rating = results[i].rating;
                    
                    var pForRating = $("<p>").text("Rating: " + rating);
                    
                    var tvImage = $("<img>");
                    
                    // add src as still image, and other attributes to hold still vs animated gif and its state
                    tvImage.attr("src", results[i].images.fixed_height_still.url);
                    tvImage.attr("data-still", results[i].images.fixed_height_still.url);
                    tvImage.attr("data-animate", results[i].images.fixed_height.url);
                    tvImage.attr("data-state","still");
                    tvImage.addClass("gif");
                    
                    gifDiv.append(pForRating);
                    gifDiv.append(tvImage);
                    
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }
        });
});

