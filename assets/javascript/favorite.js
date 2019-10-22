function addFavArr() {
  var addToFavoriteArr = [];
  return addToFavoriteArr;
}
function addPlaceToFavorite() {
  var addToFavorite = addFavArr();

  $(".favoritePlace").click(function(e) {
    // localStorage.clear();
    $(this).hide();
    $(this)
      .parent()
      .find(".unfavoritePlace")
      .show();

    var selectedPlace = $(this)
      .parent()
      .attr("name");
    console.log(selectedPlace);
    addToFavorite.push(selectedPlace);
    console.log("favorites are: " + addToFavorite);
    localStorage.setItem("totalFavorites", JSON.stringify(addToFavorite));
    e.preventDefault();
    var storedFavs = JSON.parse(localStorage.getItem("totalFavorites"));
    console.log("stored favs to show: " + storedFavs);
    for (var i = 0; i < storedFavs.length; i++) {
      var showFavs = $(
        `<div class = "myFavs w3-card my-2 pl-2 w3-lime"><h3>${storedFavs[i]}</h3></div>`
      );
      showFavs.addClass(storedFavs[i]);
      $("#displayFavoriteHere").append(showFavs);
      showFavs.attr("favoriteName", storedFavs[i]);
    }
  });
  $(".unfavoritePlace").click(function(e) {
    $(this).hide();
    $(this)
      .parent()
      .find(".favoritePlace")
      .show();

    var selectedPlace = $(this)
      .parent()
      .attr("name");
    console.log(selectedPlace);

    addToFavorite.splice(addToFavorite.indexOf(selectedPlace), 1);
    console.log("favorites are: " + addToFavorite);
    localStorage.setItem("totalFavorites", JSON.stringify(addToFavorite));
    var storedFavs = JSON.parse(localStorage.getItem("totalFavorites"));
    console.log("Remaining Favs are:  " + storedFavs);
    // $("#displayFavoriteHere")
    //   .find(`.${selectedPlace}`)
    //   .remove();
    // e.preventDefault();
  });
}

$("#favoriteSection").click(function(e) {
  e.preventDefault();
  $("#displayFavoriteHere").empty();
  var storedFavs = JSON.parse(localStorage.getItem("totalFavorites"));
  console.log("stored favs to show: " + storedFavs);
  for (var i = 0; i < storedFavs.length; i++) {
    var showFavs = $(
      `<div class = "myFavs w3-card my-2 pl-2 w3-lime"><h3>${storedFavs[i]}</h3></div>`
    );
    showFavs.addClass(storedFavs[i]);
    $("#displayFavoriteHere").append(showFavs);
    showFavs.attr("favoriteName", storedFavs[i]);
  }
  $("#clearAll").click(function(e) {
    e.preventDefault();

    $("#displayFavoriteHere").empty();
    localStorage.clear();
    $(".result_description")
      .next()
      .find(".unfavoritePlace")
      .hide();
    $(".result_description")
      .next()
      .find(".favoritePlace")
      .show();
  });
});
