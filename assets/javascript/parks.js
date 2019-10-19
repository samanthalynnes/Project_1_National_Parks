// This .on("click") function will trigger the AJAX Call
$("#btn").on("click", function(event) {
  $(".col-sm-8").empty();
  // event.preventDefault() can be used to prevent an event's default behavior.
  // Here, it prevents the submit button from trying to submit a form when clicked
  event.preventDefault();

  // Here we grab the text from the input box
  var stateNameAbbr = $("#states :selected").attr("abbr");
  console.log(stateNameAbbr);
  //var stateName = $("#states :selected").val();
  var place = $("#placeType :selected").text();
  var placeType = place.toLowerCase();
  console.log("Place Type that user selected: " + placeType);
  // This is our API key
  var APIKey = "rNNmbbVGYhG0JXXavcAsDZoDUxLVy97nKeTT9pyj";

  // Here we are building the URL we need to query the database
  var queryURL =
    "https://developer.nps.gov/api/v1/" +
    placeType +
    "?stateCode=" +
    stateNameAbbr +
    "&api_key=" +
    APIKey;

  // Here we run our AJAX call to the National Parks API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
      console.log(response);
      var resultLength = response.data.length;
      console.log(resultLength);

      // creating card on html
      // content make up

      for (var i = 0; i < resultLength; i++) {
        if (placeType === "places") {
          var sectionDiv = $("<div class='card_content'>");
          // designation
          var response_fullName = response.data[i].title;
          console.log(response_fullName);

          var cardName = $("<div class='card mb-2 result_description'>");
          var cardBody = $("<div class='card-body bg-dark p-1 my-auto'>");
          var cardContent = $(
            "<h4 class=' ml-3 my-auto'>" + response_fullName + "</h4>"
          );
          var response_description = response.data[i].listingdescription;
          // description
          var descriptionLabel = $(`<div><h4>Desription: </h4></div>`).append(
            `<p>${response_description}</p>`
          );

          // images
          var response_img = response.data[i].listingimage.url;
          if (response_img.indexOf("jpg") === -1) {
            var imgLabel = $(`<div class="imgDiv"></div>`);
          } else {
            var imgLabel = $(`<div class="imgDiv"></div>`).append(
              `<img class= "result_img mb-2" src= "${response_img}" ></img>`
            );
          }

          // var place URL
          var response_url = response.data[i].url;
          var urlLabel = $(`<div><h4>Visit WebPage: </h4></div>`).append(
            `<p><a href= ${response_url}>${response_url}</a></p>`
          );

          // appending all the labels
          sectionDiv.append(descriptionLabel, imgLabel, urlLabel);
        } else {
          var sectionDiv = $("<div class='card_content'>");
          // designation
          var response_fullName = response.data[i].fullName;
          console.log(response_fullName);

          var cardName = $("<div class='card mb-2 result_description'>");
          var cardBody = $("<div class='card-body bg-dark p-1 my-auto'>");
          var cardContent = $(
            "<h4 class=' ml-3 my-auto'>" + response_fullName + "</h4>"
          );
          var response_designation = response.data[i].designation;
          var designationLabel = $(`<div><h4>Designation: </h4></div>`).append(
            `<p>${response_designation}</p>`
          );

          var response_description = response.data[i].description;
          // description
          var descriptionLabel = $(`<div><h4>Desription: </h4></div>`).append(
            `<p>${response_description}</p>`
          );
          var response_coordinates = response.data[i].latLong;
          var response_url = response.data[i].url;

          // coordinates
          var coordinatesLabel = $(`<div><h4>Coordinates: </h4></div>`).append(
            `<p>${response_coordinates}</p>`
          );
          // var place URL
          var urlLabel = $(`<div><h4>Visit WebPage: </h4></div>`).append(
            `<p><a href= ${response_url}>${response_url}</a></p>`
          );

          // appending all the labels
          sectionDiv.append(
            designationLabel,
            descriptionLabel,
            coordinatesLabel,
            urlLabel
          );
        }

        // appending cards
        $(".col-sm-8").append(cardName.append(cardBody.append(cardContent)));
        $(".col-sm-8").append(sectionDiv);
        /*
        // adding weather info
        var lat = response_coordinates.slice(
          0,
          response_coordinates.lastIndexOf(",")
        );
        var splitLat = lat.substring(
          lat.lastIndexOf(":") + 1,
          lat.lastIndexOf(".")
        );

        console.log("lat = " + splitLat);
        var long = response_coordinates.slice(
          response_coordinates.lastIndexOf(",") + 1
        );
        var splitLong = long.substring(
          long.lastIndexOf(":") + 1,
          long.lastIndexOf(".")
        );

        console.log("long = " + splitLong);
        var weatherApiKey = "9f19e6b16e997c7ba8474f24ee4bc33c";
        var weatherQueryUrl =
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
          splitLat +
          "&lon=" +
          splitLong +
          "&appid=" +
          weatherApiKey;

        $.ajax({
          type: "GET",
          url: weatherQueryUrl
        }).then(function(response) {
          console.log("weather:" + JSON.stringify(response));
        });*/
      }

      // click event for card that show content
      $(".result_description").click(function(e) {
        e.preventDefault();
        console.log("hello");
        $(".card_content")
          .not($(this).next())
          .slideUp("slow");
        $(this)
          .next()
          .slideToggle("slow");
      });

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
