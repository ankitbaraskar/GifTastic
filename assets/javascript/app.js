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

// main function to add img tags with gifs and control animate
function makeAJAXcall() {

    // to clear existing gifs
    $("#gifs-appear-here").empty();

    var searchtv = $(this).attr("data-name");
    console.log(searchtv);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchtv + "&api_key=obrCpu0efOsCa5DrJgBmhBewTGDBxXHh&limit=20";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        console.log(results);

        var countOfGifs=0;

        // for the response array, add rating and image to a div, then append that to page
        for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13" && countOfGifs< 10) {
                countOfGifs++;

                var gifDiv = $("<div>");

                var rating = results[i].rating;

                var pForRating = $("<p>").text("Rating: " + rating);

                var tvImage = $("<img>");

                // add src as still image, and other attributes to hold still vs animated gif and its state
                tvImage.attr("src", results[i].images.fixed_height_still.url);
                tvImage.attr("data-still", results[i].images.fixed_height_still.url);
                tvImage.attr("data-animate", results[i].images.fixed_height.url);
                tvImage.attr("data-state", "still");
                tvImage.addClass("gif");

                gifDiv.append(pForRating);
                gifDiv.append(tvImage);

                $("#gifs-appear-here").prepend(gifDiv);
                
            }
        }

        // click listener to animate or still the gif
        $(".gif").on("click", function () {
            console.log("this has been clicked")
            var state = $(this).attr("data-state");
            console.log(state);

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });




    });

};



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

    // on click for new buttons added and then make an API call
    $("button").on("click", makeAJAXcall);

});

// on click listener on the existing buttons to make api call and display to page
$("button").on("click", makeAJAXcall);



