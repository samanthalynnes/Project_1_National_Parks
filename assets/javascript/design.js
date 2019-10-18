$(document).ready(function() {
  // set images on carousel
  //   queryURL =
  // "https://developer.nps.gov/api/v1/newsreleases?stateCode=&limit=5&q=parks&api_key=rNNmbbVGYhG0JXXavcAsDZoDUxLVy97nKeTT9pyj";
  api_key = "3cffbd6527cb65b37fddfd66953a8c149200b69d507cfe7340801cfa6a97fa11";
  queryURL = "https://api.unsplash.com/search/photos?page=1&query=Parks&client_id=" + api_key;
  $.ajax({
    type: "GET",
    url: queryURL
  }).then(function(response) {
    console.log(response);
    // var response_data = response.data;
    for (var i = 0; i < 5; i++) {
      var carousel_item_div = $("<div>");
      carousel_item_div.addClass("carousel-item");
      carousel_item_div.attr("data-interval", 2000);
      $(".carousel-item:first-child").addClass("active");
      var carousel_img = $("<img>");
      //   var imgSrc = response_data[i].image.url;
      var imgSrc = response.results[i].urls.regular;
      console.log(imgSrc);
      carousel_img.attr("src", imgSrc);
      carousel_img.attr("alt", "slide no " + (i + 1));
      carousel_item_div.append(carousel_img);
      $("#show_img").append(carousel_item_div);
      //   $("#show_img").append(carousel_img);
    }
  });
});
// states and places

var states = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
]

for (var i = 0; i < states.length; i++) {
    var opt = $("<option class= 'stateName'>");
    opt.html(states[i].name);
    opt.attr("abbr", states[i].abbreviation);
    $("#states").append(opt);
}

var placeType = ["places", "parks"];

for (var j = 0; j < placeType.length; j++) {
    var opt2 = $("<option class= 'typeOfPlace'>");
    opt2.text(placeType[j]);
    $("#placeType").append(opt2);
}
/*

$("#btn").click(function (e) {
    e.preventDefault();
    var stateNameAbbr = $("#states :selected").attr("abbr");
    var stateName = $("#states :selected").val();
    $("#state_modal").text(stateName);

    var selectedPlace = $("#placeType :selected").val();
    $("#places_modal").text(selectedPlace);

    // set api
    var apiKey = "rNNmbbVGYhG0JXXavcAsDZoDUxLVy97nKeTT9pyj";
    queryURL = "https://developer.nps.gov/api/v1/" + selectedPlace + "?stateCode=" + stateNameAbbr + "&api_key=" + apiKey;

    $.ajax({
        type: "GET",
        url: queryURL,
    }).then(function (response) {
        console.log(response);
        var responseData = response.data;
        for (var k = 0; k < responseData.length; k++) {
            var d = $("<div class='border m-2 text-dark'>");
            d.text(responseData[k].fullName);
            $(".modal-body").append(d);
        }
    })
    $(".modal-body").empty();
});
*/