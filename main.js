var temprature;
var loc;
var humidity;
var wind;
var direction;
var id;
var description;

function update(weather){
  wind.innerHTML = "Wind: "+weather.wind;
  direction.innerHTML = "Direction of wind: "+weather.direction;
  humidity.innerHTML = "Humidity: "+weather.humidity;
  loc.innerHTML = "Location: "+weather.loc;
  temprature.innerHTML = "Temprature: "+weather.temp;
  id.innerHTML = "Id: "+weather.id;
  description.innerHTML = "Description: " + weather.desc;
}


function updatebyZip(){
  var url = "http://api.openweathermap.org/data/2.5/weather?q=Baku,az&appid=f3aa3d34bc532e621e33e5d3d502d68f";
  sendRequest(url);
}

function sendRequest(url){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function (){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      var data = JSON.parse(xmlhttp.responseText);
      var weather = {
        humidity: data.main.humidity+"%",
        wind: data.wind.speed+"m/s",
        direction: data.wind.deg,
        loc: data.name,
        temp: KelvinToCelsius(data.main.temp) + "&deg;C ",
        id: data.id,
        desc: data.weather[0].description
      };
      update(weather);
      
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}



window.onload = function(){

  temprature = document.getElementById('temprature');
  loc = document.getElementById('location');
  humidity = document.getElementById('humidity');
  wind = document.getElementById('wind');
  direction = document.getElementById('direction');
  id = document.getElementById("id");
  description = document.getElementById("description");
  updatebyZip();
}

function KelvinToCelsius(temp){
  return Math.round(temp-273.15);
}