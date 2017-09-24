$(document).ready(function() {
  $("#search").bind("keypress", {}, keypressInBox);

  //Search button
  document.getElementById("btClick").onclick = function() {
    wikipediaSearch();
  };
  
 
  document.getElementById("btRefresh").onclick = function() {
    cleanPage();
  };


});

//Clean page
function cleanPage(){
  document.getElementById("search").value = "";
    var resultsNode = document.getElementById("results");
    while (resultsNode.firstChild) {
      resultsNode.removeChild(resultsNode.firstChild);
    }
}

//Search on enter key press
function keypressInBox(e) {
  var code = e.keyCode ? e.keyCode : e.which;
  if (code == 13) {
    //Enter keycode
    e.preventDefault();
    wikipediaSearch();
  }
}

//Wikiedia search api call
function wikipediaSearch() {
  var searchString = document.getElementById("search").value;

  $.ajax({
    url:
      "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
        searchString +
        "&prop=info&inprop=url&utf8=&format=json",
    dataType: "jsonp",
    success: function(response) {
      console.log(response.query);
      if (response.query.searchinfo.totalhits === 0) {
      //  showError();
      } else {
        cleanPage();
        showResults(response);
      }
    },
    error: function() {
      alert("Error retrieving search results, please refresh the page");
    }
  });
}

//Show resutls on page
function showResults(response) {
  for (i = 0; i < 10; i++) {
    var newdiv = document.createElement("div");
    newdiv.innerHTML =
      '<div class="card text-left">' +
      "<a href=https://en.wikipedia.org/?curid=" +
      response.query.search[i].pageid +
      ' target="_blank">' +
      '<h5 class="card-title">' +
      response.query.search[i].title +
      "</h5></a>" +
      '<p class="card-text">' +
      response.query.search[i].snippet +
      "</p>" +
      "</div>";
    document.getElementById("results").appendChild(newdiv);
  }

  var searchString = document.getElementById("search").value;
  searchUrl =
    "https://en.wikipedia.org/w/index.php?search=" +
    searchString;

  var newdiv = document.createElement("div");
  newdiv.innerHTML =
    "<div><a href=" +
    searchUrl +
    ' class="btn btn-link" target="_blank">See more results at Wikipedia...</a></div>';
  document.getElementById("results").appendChild(newdiv);
}