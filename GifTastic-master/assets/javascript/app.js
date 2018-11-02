var categoriesArray = ["Bowser", "Kirby", "Luigi", "Mario", "Toad", "Waluigi", "Wario", "Yoshi"];

console.log(categoriesArray);

$(document).ready(function () {

    //function to show buttons for categories I put in
    function renderBtns() {
        $("#gifsView").empty();
        for (var i = 0; i < categoriesArray.length; i++) {
            var g = $("<button>");
            g.addClass("gifsBtn");
            g.attr("data-gifname", categoriesArray[i]);
            g.text(categoriesArray[i]);
            $("#gifsView").append(g);
        } 
    }
    //function to add gifs upon user click event
    $("#addGifBtn").on("click", function (event) {
        event.preventDefault();
        var user_gif = $("#user-input").val().trim();
        categoriesArray.push(user_gif);
        renderBtns();
    });

 // Function to display gifs by calling GIPHY API
 function displayGif() {
    var gifs = $(this).attr("data-gifname");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=3EWX2KMEwMHskBcfRsRIm9GjdIPB9dDf&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            console.log(response);
            $("#gifsDisplay").empty();
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<rating>").html("Rating:" + rating);
                p.addClass("rating");
                
                var imgstill = results[i].images.fixed_height_still.url;
                var imganimate = results[i].images.fixed_height.url;
                console.log(imgstill);
                var gifImage = $("<img>");
                gifImage.attr("src", imgstill);
                gifImage.attr("state", "still");
                gifImage.attr("still", results[i].images.fixed_height_still.url);
                gifImage.attr("animate", results[i].images.fixed_height.url);
                gifImage.addClass("gifImage");
                gifDiv.prepend(p);
                gifDiv.prepend(gifImage);

                $("#gifsDisplay").prepend(gifDiv);
                console.log(gifDiv);
                console.log(gifImage);
                console.log(rating);
                
            }

            //Function to toggle between still and animated gif upon user click
            $(".gifImage").on("click", function () {
                var state = $(this).attr("state");
                if (state === "still") {
                    $(this).attr("state", "animate");
                    $(this).attr("src", $(this).attr("animate"));
                }
                else if (state === "animate") {
                    $(this).attr("state", "still");
                    $(this).attr("src", $(this).attr("still"));
                }

            });

        })

}


$(document).on("click", ".gifsBtn", displayGif);

renderBtns();
}); 