const APIKey = "e3ace024fb02522bf9e3476b1dcc4399"

var cities = [];

var cityFormEl=document.querySelector("#city-search-form");
var cityInputEl=document.querySelector("#city");
var weatherContainerEl= document.querySelector("#current-weather-container");
var citySearchInputEl= document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");

var formSubmitHandler = function(event){
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if(city){
    getCityWeather(city);
    get5Day(city);
    cities.unshift({city});
  } else {
    alert ("Please enter a City");
  }
  saveSearch();
  pastSearch(city);
}

var saveSearch = function(){
  localStorage.setItem("cities", JSON.stringify(cities));
};

var getCityWeather = function(city) {
  var APIkey = "e3ace024fb02522bf9e3476b1dcc4399"
  var APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`

  fetch(APIurl)
  .then(function(response){
    response.json().then(function(data){
      displayWeather(data, city);
    });
  });
};

var displayWeather = function(weather, searchCity){

  weatherContainerEl.textContent = "";
  citySearchInputEl.textContent = searchCity;

  var currentDate = document.createElement("span")
  currentDate.textContent =" (" + moment(weather.dt.value).format("MM D, YYYY") + ") ";
  citySearchInputEl.appendChild(currentDate);

  var weatherIcon = document.createElement("img")
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
  citySearchInputEl.appendChild(weatherIcon);

  var temperatureEl = document.createElement("span");
  temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
  temperatureEl.classList = "list-group-item"

  var humidityEl = document.createElement("span");
  humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
  humidityEl.classList = "list-group-item"

  var windSpeedEl = document.createElement("span");
  windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  windSpeedEl.classList = "list-group-item"

  weatherContainerEl.appendChild(temperatureEl);
  weatherContainerEl.appendChild(humidityEl);
  weatherContainerEl.appendChild(windSpeedEl);

  var lat = weather.coord.lat;
  var lon = weather.coord.lon;
  getUVIndex(lat,lon)

}

var getUVIndex = function(lat,lon){
  var APIkey = "e3ace024fb02522bf9e3476b1dcc4399"
  var APIurl = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIkey}&lat=${lat}&lon=${lon}`
  fetch(APIurl)
  .then(function(response){
    response.json().then(function(data){
      displayUVIndex(data)
    });
  });
}

var displayUVIndex = function(index){
  var uvIndexEl =document.createElement("div");
  uvIndexEl.textContent = "UV Index: "
  uvIndexEl.classList = "list-group-item"

  uvIndexValue = document.createElement("span")
  uvIndexValue.textContent = index.value
  
  if(index.value <=2) {
    uvIndexValue.classList = "favorable"
  } else if (index.value >2 && index.value <=8) {
    uvIndexValue.classList ="moderate "
  } else if (index.value >8){
    uvIndexValue.classList = "severe"
  };

  uvIndexEl.appendChild(uvIndexValue);

  weatherContainerEl.appendChild(uvIndexEl);
}

var get5Day = function(city){
  var APIkey = "e3ace024fb02522bf9e3476b1dcc4399"
  var APIurl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIkey}`

  fetch(APIurl)
  .then(function(response){
    response.json().then(function(data){
      display5Day(data);
    });
  });
};

var display5Day = function(weather){
  forecastContainerEl.textContent = ""
  forecastTitle.textContent = "5 Day Forecast: ";

  var forecast = weather.list;
    for(var i=5; i < forecast.length; i=i+8){
    var dailyForecast = forecast[i];

    var forecastEl=document.createElement("div");
    forecastEl.classList = "card bg-primary text-light m-2";

    var forecastDate = document.createElement("h5")
    forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D. YYYY");
    forecastDate.classList = "card-header text-center"
    forecastEl.appendChild(forecastDate);

    var weatherIcon = document.createElement("img")
    weatherIcon.classList = "card-body text-center";
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);

    forecastEl.appendChild(weatherIcon);

    var forecastTempEl=document.createElement("span");
    forecastTempEl.classList = "card-body text-center";
    forecastTempEl.textContent = dailyForecast.main.temp + " °F";

    forecastEl.appendChild(forecastTempEl);

    var forecastHumEl= document.createElement("span");
    forecastHumEl.classList = "card0body text-center";
    forecastHumEl.textContent = dailyForecast.main.humidity + " %";


    forecastEl.appendChild(forecastHumEl);

      forecastContainerEl.appendChild(forecastEl)

    }
}

var pastSearch = function(pastSearch) {

  pastSearchEl = document.createElement("button");
  pastSearchEl.textContent = pastSearch;
  pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
  pastSearchEl.setAttribute("data-city",pastSearch)
  pastSearchEl.setAttribute("type", "submit");

  pastSearchButtonEl.prepend(pastSearchEl);
}

var pastSearchHandler = function(event){
  var city = event.target.getAttribute("data-city")
  if(city){
      getCityWeather(city);
      get5Day(city);
  }
}

cityFormEl.addEventListener("submit", formSubmitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);



// function initPage() {
//   const inputEl = document.getElementByIdById("city-input");
//   const searchEl = document.getElementById("search-button");
//   const clearEl = document.getElementById("clear-history");
//   const nameEl = document.getElementById("city-name");
//   const currentPicEl = document.getElementById("current-pic");
//   const currentTempEl = document.getElementById("temperature");
//   const currentHumidityEl = document.getElementById("humidity");
//   const currentWindEl= document.getElementById("wind-speed");
//   const currentUVEl = document.getElementById("UV-index");
//   const historyEl = document.getElementById("history");

//   let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
//   console.log(searchHistory);


// const APIKey = "e3ace024fb02522bf9e3476b1dcc4399"

// function getWeather(cityName) {

//   let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
//   axios.get(queryURL)
//   .then(function(response) {
//     console.log(response);

//     const currentData = new Date(response.data.dt*1000);
//     console.log(currentDate);
//     const day = currentDate.getDate();
//     const month = currentDate.getMonth() + 1;
//     const year = currentDate.getFullYear();
//     nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
//     let weatherPic = response.data.weather[0].icon;
//     currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
//     currentPicEl.setAttribute("alt",response.data.weather[0].description);
//     currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
//     currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
//     currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

//   let lat = response.data.coord.lat;
//   let lon = response.data.coord.lon;

//   let UVQUERYURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
  
//   .then(function(response){
//     let UVIndex = document.createElement("span");
//     UVIndex.setAttribute("class","badge-danger");
//     UVIndex.innerHTML = response.data[0].value;
//     currentUVEl.innerHTML = "UV Index: ";
//     currentUVEl.append(UVIndex);
//   });

//   let cityID = response.data.id;
//   let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
//   .then(function(response) {


//   })

//   })

// }


// }