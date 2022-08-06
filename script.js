var lon = -76.342339;
var lat = 37.028271;
var exclude = ["current", "minutely", "daily"];
var city_name = "Tonganoxie";
var state_code;
var country_code;
var inputField = $("#lookingFor");
var cityID;


api_key = "";

// fetch ("http://api.openweathermap.org/geo/1.0/direct?q="+city_name+"&appid="+api_key)
//     .then(function (geocord) {
//         return geocord.json();
//     })
//     .then(function (data) {
//         console.log(data)
//     });

// fetch ("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&cnt=3&appid="+api_key)
//     .then(function (response) {
//         $("p.1").text(response.status)
//         return response.json();
//     })
//     .then(function (weather) {
//         console.log(weather)
//     })

var checkHistory = function () {
    for (city in localStorage) {
        if (city.includes("city")) {

            var targetCity = "#"+city;
            console.log(city)
            // console.log(typeof(targetCity))
            var valueCity = localStorage.getItem(city);
            var history = $("#history");
            var historyItem = $("<p>")
            historyItem.text(valueCity)
            history.append(historyItem);
            historyItem.attr("id", targetCity)
        } else {
            continue;
        }

    }
}

checkHistory();

function displayCity () {
    var currentCity = $("#yourResult");
    currentCity.text($(inputField).val())
}

function addTohistory () {
    var searchedCitys = $("#history");    
    var newItem = $("<p>");
    var inputFieldValue = $(inputField).val();
    newItem.text(inputFieldValue);
    searchedCitys.append(newItem);
    $("p").attr("id", function(index) {
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
    displayCity();
    addTohistory();
})