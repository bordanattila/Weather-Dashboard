var city_name = "Tonganoxie";
var lat = 0;
var lon = 0;
var exclude = ["minutely", "hourly", "alerts"]
var state_code;
var country_code;
var inputField = $("#lookingFor");
var cityID;
api_key = "019e087c294ce22b349c23fe666c8451";
var today = "";

var checkHistory = function () {
    for (city in localStorage) {
        if (city.includes("city")) {

            var targetCity = "#"+city;
            var valueCity = localStorage.getItem(city);
            var history = $("#history");
            var historyItem = $("<button>")
            historyItem.addClass("btn btn-secondary stretch margin")
            historyItem.text(valueCity)
            history.append(historyItem);
            historyItem.attr("id", targetCity)
        } else {
            continue;
        }

    }
}

checkHistory();

function getLongLat (city_name) {
    //Add city name to get lat and long
    console.log(city_name);
    fetch ("http://api.openweathermap.org/geo/1.0/direct?q="+city_name+"&appid="+api_key)
    .then(function (geocord) {
        return geocord.json();
    })
    .then(function (coordinates) {
            lat = (coordinates[0].lat);
            lon = (coordinates[0].lon);
            getWeather(lat, lon);
        });
    }
    
    // Add lat and long to get weather data
    function getWeather (lat, lon) {
        fetch ("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric&appid="+api_key)
        .then(function (response) {        
            return response.json();
        })
        .then(function (weather) {
            console.log("weather");
            console.log(weather);
            var todaySplit = (weather.list[0].dt_txt).split(" ")
            today = todaySplit[0]
            temperatureShow = weather.list[0].main.temp
            humidityShow = weather.list[0].main.humidity
            windShow = weather.list[0].wind.speed
            getIcon = weather.list[0].weather[0].icon
            // icon = url("http://openweathermap.org/img/wn/"+getIcon+"@2x.png")
            console.log(today)
            displayCity(city_name);
        })
    }    

var temperatureShow;
var windShow;
var humidityShow;
var getIcon;

var cityToShow = $("#yourResult");
function displayCity (city_name) {
    var iconURL = "http://openweathermap.org/img/wn/"+ getIcon +"@2x.png";
    var image = $("<img>");
    image.attr("id", "icon")
    // cityToShow.append(image)
    $("#icon").attr("src", iconURL)
    cityToShow.text(city_name + " ( " + today + " ) ");
    var temperature = $("<p>");
    temperature.text("Temperature: "+temperatureShow+ " °C");
    cityToShow.append(temperature)
    var wind =$("<p>");
    wind.text("Wind: "+windShow+" Km/h");
    cityToShow.append(wind)
    var humidity = $("<p>");
    humidity.text("Humidity: "+humidityShow+" %");
    cityToShow.append(humidity)
    // add icon
    console.log("icon")
    console.log(getIcon)
  
}

function displayCityAgain (searchedCitys) {
    var currentCity = $("#yourResult");
    currentCity.text(searchedCitys + " (" + "date)");
    getLongLat(city_name)
}

function addTohistory () {
    var searchedCitys = $("#history");    
    var newItem = $("<button>");
    var inputFieldValue = $(inputField).val();
    newItem.text(inputFieldValue);
    newItem.addClass("btn btn-secondary stretch margin");
    searchedCitys.append(newItem);
    $("button").attr("id", function(index) {
        return "city"+index;
    })
    store(newItem, inputFieldValue)
}

function store (newItem, inputFieldValue) {
    cityID = $(newItem).attr("id")
    localStorage.setItem(cityID, inputFieldValue);
}


$("#find").on("click", function (event) {
    event.preventDefault();
    city_name = ($(inputField).val())
    getLongLat(city_name)
    addTohistory();
})

$("button.btn-secondary").on("click", function () {
    city_name = ($(this).text());
    displayCityAgain(city_name);
})