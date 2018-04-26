// Initial array of animals
var animals = ["dog", "cat", "panda", "lion", "tiger", "bear", "pig", "bird", "fish", "dinosaur"];

// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=GG1VBtpkZPzxUCI1mgIFJHEOxAWGVT5Q&limit=10";

  // Creating an AJAX call for the specific animal button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  
  .then(function(response) {

    console.log(queryURL);
    console.log(response);

    var results = response.data;

    for (var i = 0; i < results.length; i++){

        // Creating a div to hold the animal
        var animalDiv = $("<div class='animal'>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var animalImage = $("<img class='gif'>");

        // animalImage.addClass("playing");
        // Setting the src attribute of the image to a property pulled off the result item
        animalImage.attr("src", results[i].images.fixed_height_still.url);

        
        // Appending the paragraph and image tag to the animalDiv
        animalDiv.append(p);
        animalDiv.append(animalImage);
        
        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
        $("#animals-view").prepend(animalDiv);
    }

  });

}

// Function for displaying animal data
function renderButtons() {

  // Deleting the animals prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons for each animal in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of animal-btn to our button
    a.addClass("animal-btn");
    // Adding a data-attribute
    a.attr("data-name", animals[i]);
    // Providing the initial button text
    a.text(animals[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a animal button is clicked
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var animal = $("#animal-input").val().trim();

  // Adding animal from the textbox to our array
  animals.push(animal);

  // Calling renderButtons which handles the processing of our animal array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

$("body").on("click", ".gif", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var src = $(this).attr("src");
  //Pause gif pics at start.
  //click to play and pause gif pics.
  if ($(this).hasClass("playing")) {
    $(this).attr("src", src.replace(/\.gif/i, "_s.gif"));
    $(this).removeClass("playing");
  } else {
    $(this).addClass("playing");
    $(this).attr("src", src.replace(/\_s.gif/i, ".gif"));
  }
});