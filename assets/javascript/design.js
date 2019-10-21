$(document).ready(function() {
  $("#loading").hide();
  // set images on carousel
  var api_key =
    "3cffbd6527cb65b37fddfd66953a8c149200b69d507cfe7340801cfa6a97fa11";
  var queryURL =
    "https://api.unsplash.com/search/photos?page=1&query=US++natural+Parks&client_id=" +
    api_key;
  $.ajax({
    type: "GET",
    url: queryURL
  }).then(function(response) {
    console.log(response);
    for (var i = 0; i < 5; i++) {
      var carousel_item_div = $("<div>");
      carousel_item_div.addClass("carousel-item");
      carousel_item_div.attr("data-interval", 3000);
      $(".carousel-item:first-child").addClass("active");
      var carousel_img = $("<img>");
      var imgSrc = response.results[i].urls.regular;
      console.log(imgSrc);
      carousel_img.attr("src", imgSrc);
      carousel_img.attr("alt", "slide no " + (i + 1));
      carousel_item_div.append(carousel_img);
      $("#show_img").append(carousel_item_div);
    }
  });
});
// states and places
var placeType = ["Places", "Parks"];
for (var j = 0; j < placeType.length; j++) {
  var opt2 = $("<option class= 'typeOfPlace'>");
  opt2.text(placeType[j]);
  $("#placeType").append(opt2);
}
var stateNamesArr = [
  "alabama",
  "alaska",
  "arizona",
  "arkansas",
  "california",
  "colorado",
  "connecticut",
  "delaware",
  "florida",
  "georgia",
  "hawaii",
  "idaho",
  "illinois",
  "indiana",
  "iowa",
  "kansas",
  "kentucky",
  "louisiana",
  "maine",
  "maryland",
  "massachusetts",
  "michigan",
  "minnesota",
  "mississippi",
  "missouri",
  "montana",
  "nebraska",
  "nevada",
  "new hampshire",
  "new jersey",
  "new mexico",
  "new york",
  "north carolina",
  "north dakota",
  "ohio",
  "oklahoma",
  "oregon",
  "pennsylvania",
  "rhode island",
  "south carolina",
  "south dakota",
  "tennessee",
  "texas",
  "utah",
  "vermont",
  "virginia",
  "washington",
  "west virginia",
  "wisconsin",
  "wyoming"
];
var stateAbbr = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY"
];
// function to get state abbr based on user's state input
function getAbbr() {
  var userSelectedStateName = $("#states").val();
  var correctStateName = stateNamesArr.includes(
    userSelectedStateName.toLowerCase()
  );
  if (userSelectedStateName.length === 0) {
    $("#status").text("Enter something");
  } else if (!correctStateName) {
    $("#status").text("Enter correct state name");
  }
  var index = stateNamesArr.indexOf(userSelectedStateName.toLowerCase());
  var userSelectedStateAbbr = stateAbbr[index];
  return userSelectedStateAbbr;
}
