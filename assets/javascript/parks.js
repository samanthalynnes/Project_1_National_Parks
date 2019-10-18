
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  
    // This .on("click") function will trigger the AJAX Call
    $("#user-state-input").on("click", function(event) {

        // event.preventDefault() can be used to prevent an event's default behavior.
        // Here, it prevents the submit button from trying to submit a form when clicked
        event.preventDefault();

        // Here we grab the text from the input box
        var stateInput = $("#user-state-input").val();

    // This is our API key
    var APIKey = "rNNmbbVGYhG0JXXavcAsDZoDUxLVy97nKeTT9pyj";

    // Here we are building the URL we need to query the database
    var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateInput + "&api_key=" + APIKey;

    // Here we run our AJAX call to the National Parks API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        $("#state-output").text(response);

        // Transfer content to HTML
        // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        // $(".wind").text("Wind Speed: " + response.wind.speed);
        // $(".humidity").text("Humidity: " + response.main.humidity);
        // $(".temp").text("Temperature (F) " + response.main.temp);

        // Log the data in the console as well
        // console.log("Wind Speed: " + response.wind.speed);
        // console.log("Humidity: " + response.main.humidity);
        // console.log("Temperature (F): " + response.main.temp);
      });
    }); 