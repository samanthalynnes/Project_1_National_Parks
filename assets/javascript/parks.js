$("#btn").on("click", function(event) {
  $("#status").text("");
  $("#loading")
    .show(1)
    .delay(1000)
    .hide(1);
  $(".col-sm-8").empty();
  event.preventDefault();
  // var stateNameAbbr = $("#states :selected").attr("abbr");
  var stateNameAbbr = getAbbr();
  var place = $("#placeType :selected").text();
  var placeType = place.toLowerCase();
  var APIKey = "rNNmbbVGYhG0JXXavcAsDZoDUxLVy97nKeTT9pyj";
  var queryURL =
    "https://developer.nps.gov/api/v1/" +
    placeType +
    "?stateCode=" +
    stateNameAbbr +
    "&api_key=" +
    APIKey;
  $("#states").val("");
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
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
        // designation
        var response_designation = response.data[i].designation;
        var designationLabel = $(`<div><h4>Designation: </h4></div>`).append(
          `<p>${response_designation}</p>`
        );
        // description
        var response_description = response.data[i].description;
        var descriptionLabel = $(`<div><h4>Description: </h4></div>`).append(
          `<p>${response_description}</p>`
        );
        // coordinates
        var response_coordinates = response.data[i].latLong;
        var coordinatesLabel = $(
          `<div id="location"><h4>Coordinates: </h4></div>`
        ).append(`<p class="availableCoordinates">${response_coordinates}</p>`);
        $(".availableCoordinates").attr("data", response_coordinates);
        // URL
        var response_url = response.data[i].url;
        var urlLabel = $(`<div><h4>Visit WebPage: </h4></div>`).append(
          `<p><a href= ${response_url} target="_blank">${response_url}</a></p>`
        );
        if (response_coordinates.indexOf("lat") === -1) {
          sectionDiv.append(designationLabel, descriptionLabel, urlLabel);
        } else {
          sectionDiv.append(
            designationLabel,
            descriptionLabel,
            coordinatesLabel,
            urlLabel
          );
        }
      }
      // appending cards
      $(".col-sm-8").append(cardName.append(cardBody.append(cardContent)));
      $(".col-sm-8").append(sectionDiv);
    }
    // click event for card that shows content
    $(".result_description").click(function(e) {
      e.preventDefault();
      $(".card_content")
        .not($(this).next())
        .slideUp("slow");
      $(this)
        .next()
        .slideToggle("slow");
      var location = $(this)
        .next()
        .find("#location p")
        .text();
      getWeather(location);
      $(".temp:last-child").remove();
    });
  });
});
function getWeather(coordinates) {
  var availableCoordinates = coordinates;
  var tempLabel;
  var response_temp;
  // incorporating weather information for the parks
  if (availableCoordinates.indexOf("lat") === -1) {
    console.log("No coordinates available");
  } else {
    var lat = availableCoordinates.slice(
      0,
      availableCoordinates.lastIndexOf(",")
    );
    var splitLat = lat.substring(
      lat.lastIndexOf(":") + 1,
      lat.lastIndexOf(".")
    );
    console.log("lat = " + splitLat);
    var long = availableCoordinates.slice(
      availableCoordinates.lastIndexOf(",") + 1
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
      console.log(response);
      response_temp = (response.main.temp - 273.15) * 1.8 + 32;
      console.log("Fahrenheit:" + response_temp.toFixed(0));
      var weatherLabel = $(
        `<div class="temp"><h4>Current Weather Condition: </h4></div>`
      );
      var response_weather_description = response.weather[0].description;
      var formatted_weather_desc =
        response_weather_description.charAt(0).toUpperCase() +
        response_weather_description.slice(1);
      console.log("Weather Description: " + response_weather_description);
      var response_humidity = response.main.humidity;
      var response_wind = response.wind.speed;
      tempLabel = $(
        `<p>Temperature: ${response_temp.toFixed(
          0
        )}&#176;F <small>${formatted_weather_desc}</small></p> `
      );
      var humidityLabel = $(`<p>Humidity: ${response_humidity}%</p>`);
      var windLabel = $(
        `<p>Wind Speed: ${Math.round(
          response_wind * 2.237
        )} <small>mph</small></p>`
      );
      // appending all the labels
      weatherLabel.append(tempLabel, humidityLabel, windLabel);
      $(".card_content").append(weatherLabel);
    });
  }
}
