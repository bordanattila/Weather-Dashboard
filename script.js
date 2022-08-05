var lon = -76.342339;
var lat = 37.028271;
var exclude = ["current", "minutely", "daily"];
var city_name = "Tonganoxie";
var state_code;
var country_code;


api_key = "019e087c294ce22b349c23fe666c8451";

fetch ("http://api.openweathermap.org/geo/1.0/direct?q="+city_name+"&appid="+api_key)
    .then(function (geocord) {
        return geocord.json();
    })
    .then(function (data) {
        console.log(data)
    });

fetch ("https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+api_key)
    .then(function (response) {
        $("p.1").text(response.status)
        return response.json();
    })
    .then(function (weather) {
        console.log(weather)
    })