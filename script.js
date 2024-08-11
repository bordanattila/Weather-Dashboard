var city_name = "";
var exclude = "alerts,minutely,hourly"
var inputField = $("#lookingFor");
var cityID;
var api_key = "64ccff0c15dc71ef4d267abbba4175d0";
var today = "";
var temperatureShow;
var windShow;
var humidityShow;
var getIcon;
//Define global variables for for current weather
var mainLine = $(".city");
var temperature = $(".temperature");
var wind =$(".wind");
var humidity = $(".humidity");
var uvi = $(".uv");
var uvBox = $("#uvBox");
var uviShow;

//Check local sotrage for search history
var checkHistory = function () {
    for (city in localStorage) {
        if (city.includes("city")) {
            
            var targetCity = "#"+city;
            var valueCity = localStorage.getItem(city);
            var history = $("#history");
            var historyItem = $("<button>")
            historyItem.addClass("btn btn-warning stretch margin")
            historyItem.text(valueCity)
            history.append(historyItem);
            historyItem.attr("id", targetCity)
        } else {
            continue;
        }
        
    }
}

checkHistory();

//Add city name to get lat and long
function getLongLat (city_name) {
    fetch ("https://api.openweathermap.org/geo/1.0/direct?q="+city_name+"&appid="+api_key)
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
    fetch ("https://api.openweathermap.org/data/3.0/onecall?lat="+lat+"&lon="+lon+"&exclude="+exclude+"&units=metric&appid="+api_key)
    .then(function (response) {  
        return response.json();
    })
    .then(function (weather) {
        today = weather.current.dt;
        todayShow = moment.unix(today).format("YYYY MMM Do");
        temperatureShow = weather.current.temp;
        humidityShow = weather.current.humidity;
        windShow = weather.current.wind_speed;
        getIcon = weather.current.weather[0].icon;
        uviShow = weather.current.uvi;
        displayCity(city_name);
        displayCards(weather);
    })
    document.querySelector("h4").classList.remove("hide");
}    

//Add content to current weather
function displayCity (city_name) {
    mainLine.text(city_name + " ( " + todayShow + " ) ");
    var iconURL = "https://openweathermap.org/img/wn/"+ getIcon +"@2x.png";
    var image = $(".city_img");
    image.attr("id", "icon");
    $("#icon").attr("src", iconURL);
    temperature.text("Temperature: "+temperatureShow+ " °C");
    wind.text("Wind: "+windShow+" Km/h");
    humidity.text("Humidity: "+humidityShow+" %");
    uvi.text("UV Index: ");
    uvBox.text(uviShow);
    checkUVindex(uviShow);  
    
}

//Dispaly data for city selected form search hstory
function displayCityAgain (city_name) {
    getLongLat(city_name);
}

//Add city to search history display
function addTohistory (city_name) {
    var searchedCitys = $("#history");    
    var newItem = $("<button>");
    newItem.text(city_name);
    newItem.addClass("btn btn-warning stretch margin");
    searchedCitys.append(newItem);
    $("button").attr("id", function(index) {
        return "city"+index;
    })
    store(newItem, city_name);
}

//Save city name to search history in local storage
function store (newItem, city_name) {
    cityID = $(newItem).attr("id");
    localStorage.setItem(cityID, city_name);
}

var city_entered = "";
//Event listener for the search button
$("#find").on("click", function (event) {
    event.preventDefault();
    city_entered = ($(inputField).val());
    capitalize(city_entered);
})

//Capitalize first letters of city entered
function capitalize (city_entered) {
    var citySplit = city_entered.toLowerCase().split(' ');
    for (var i = 0; i < citySplit.length; i++) {
        citySplit[i] = citySplit[i].charAt(0).toUpperCase() + citySplit[i].substring(1);     
    }
    city_name = citySplit.join(" ");
    addTohistory(city_name);
    getLongLat(city_name);
}

//Event listener for the search history
$("#history").on("click", ".btn-warning", function () {
    city_name = ($(this).text());
    displayCityAgain(city_name);
})

//Event listener for enter key
$("#lookingFor").keypress(function (enter) {
    if (enter.which === 13) {
        city_entered = ($(inputField).val());
        capitalize(city_entered);
    }
})

//Event listener for clear history
$("button.btn-danger").on("click", function () {
    localStorage.clear();
    location.reload();
})

//Add content to 5 day forecast cards
function displayCards (weather) {
    for (i=1; i<6; i++) {
        var date =  weather.daily[i].dt;
        var dateShow = moment.unix(date).format("YYYY MMM Do")
        var cardIcon = weather.daily[i].weather[0].icon;
        var cardTemperature = weather.daily[i].temp.day;
        var cardHumidity = weather.daily[i].humidity;
        var cardWind = weather.daily[i].wind_speed;        
        var cardDate = $(".cardDate-"+i);
        cardDate.text(dateShow);        
        var cardiconURL = "https://openweathermap.org/img/wn/"+ cardIcon +"@2x.png";
        var image = $(".card_img-"+i);       
        image.attr("src", cardiconURL);
        var cardTemperatureShow = $(".cardTemperature-"+i);
        cardTemperatureShow.text("Temperature: " + cardTemperature + " °C");        
        var cardHumidityShow = $(".cardHumidity-"+i);
        cardHumidityShow.text("Humidity: " + cardHumidity + "%");        
        var cardWindShow = $(".cardWind-"+i);
        cardWindShow.text("Wind: " + cardWind + " Km/h");        
    }    
}

//Check uv index and colour it accordingly
function checkUVindex (uviShow) {
    uvBox.removeClass("green yellow orange red purple")
    if (uviShow < 3 ) {
        uvBox.addClass("green");
    } else if (uviShow > 2 && uviShow < 6) {
        uvBox.addClass("yellow");
    } else if (uviShow > 5 && uviShow < 8){
        uvBox.addClass("orange");
    } else if (uviShow > 7 && uviShow < 11) {
        uvBox.addClass("red");
    } else {
        uvBox.addClass("purple");
    }
}
