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
        
        let cityName = $(".jumbotron").addClass("city-weather").text(citySearch + " Weather Details  ");
            let currentDate = moment().format("  MM-DD-YYYY");
            let windData = $("<p>").text("Wind Speed: " + response.wind.speed).addClass("lead");
            let humidityData = $("<p>").text("Humidity: " + response.main.humidity + "%").addClass("lead");
            var iconcode = response.weather[0].icon;
            var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
            let weatherImg = $("<img>").attr("src", iconurl);
            let date = $("<p>").text(moment.unix().format("MMM Do YY")).addClass("lead");
            $("#five-day").empty();
            // Convert the temp to fahrenheit
            let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        let roundedTemp = Math.floor(tempF);
        
        let tempData = $("<p>").text("Temp (K): " + response.main.temp + "°").addClass("lead");
        let tempDataF = $("<p>").text("Temp (F): " + roundedTemp + "°").addClass("lead");
        
        cityName.append(weatherImg, currentDate, windData, humidityData, tempData, tempDataF);
        $("container").append(cityName);
