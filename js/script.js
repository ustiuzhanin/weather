'use strict';

/*
get request
*/

(function () {
  window.load = function (url, onLoad, onError) {
    var XHR_TIMEOUT = 10000;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = XHR_TIMEOUT;

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Connection error');
    });

    xhr.addEventListener('timeout', function () {
      onError('Could not load the request for ' + xhr.timeout + ' ms');
    });

    xhr.open('GET', url);
    xhr.send();
  };
})();

/*
location
*/

(function () {

  var onLocationSuccess = function (position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    var locationUrl = 'https://fcc-weather-api.glitch.me/api/current?lat=' + latitude + '&lon=' + longitude;

    var onDataSuccess = function (data) {
      window.dataChange(data);
    };

    var onDataError = function (message) {
      console.error(message);
    };

    window.load(locationUrl, onDataSuccess, onDataError);
  };

  var onLocationError = function () {
    console.error('could not get your location');
  };

  navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
})();

/*
apply data to html
*/

(function () {
  window.dataChange = function (data) {
    var loadingGif = document.querySelector('.weather__loading');
    var weatherWrapper = document.querySelector('.weather__wrapper');
    var location = document.querySelector('.weather__location');
    var description = document.querySelector('.weather__description');
    var temperature = document.querySelector('.weather__temperature--value');
    var measure = document.querySelector('.weather__temperature--measure');
    var img = document.querySelector('.weather__img');

    loadingGif.classList.add('visually-hidden');
    weatherWrapper.classList.remove('visually-hidden');

    location.textContent = data.name + ', ' + data.sys.country;
    description.textContent = data.weather[0].main;
    temperature.textContent = Math.floor(data.main.temp);
    img.src = data.weather[0].icon;

    var onTemperatureClick = function (evt) {

      if (measure.textContent === ' °C') {
        measure.textContent = ' °F';
        temperature.textContent = Math.floor(data.main.temp * 1.8 + 32);
      } else {
        measure.textContent = ' °C';
        temperature.textContent = Math.floor(data.main.temp);
      };

    };

    measure.addEventListener('click', onTemperatureClick);
  };

})();
