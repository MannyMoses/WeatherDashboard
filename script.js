let city = $(".city");
let wind = $(".wind");
let humidity = $(".humidity");
let temp = $(".temp");

let searchArr = [];
let APIKey = "&appid=d353287a7c05fbad47b75ea8ddb79b6a";

$(document).ready(function () {
  renderSearchList();

  $("#searchBtn").click(function (event) {
      event.preventDefault();
      //grab search term from input search field
      let searchTerm = $("#search").val().trim();
      triggerSearch(searchTerm);
  })

  function triggerSearch(citySearch) {
      //construct the URL
      let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
      citySearch + APIKey;
    
      $("<button>").text(citySearch).prepend(".list-group-item");
      //ajax call for local weather
      $.ajax({
          type: "GET",
          url: queryURL
      }).then(function (response) {
          let previousCity = JSON.parse(localStorage.getItem("cities"));
          if (previousCity) {
              previousCity.push(response.name);
              localStorage.setItem("cities", JSON.stringify(previousCity));
          } else {
              searchArr.push(response.name)
              localStorage.setItem("cities", JSON.stringify(searchArr));
          }