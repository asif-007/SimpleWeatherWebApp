import React, { useState } from 'react';

const api = {
  key: "0c42f7f6b53b244c78a418f4f181282a",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});


  const search = event => {
    if(event.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
          .then(result=> {
            setWeather(result);
            setQuery('');
            console.log(result);
          });

    }
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  

  return (
    <div className={(typeof weather.main != "undefined") 
      ? ((weather.weather[0].main === "Rain") ? 'app rain' : 
          (weather.weather[0].main === "Haze") ? 'app haze' :
          (weather.weather[0].main === "Sunny") ? 'app clear' :
          (weather.weather[0].main === "Clear") ? 'app clear' :
          (weather.weather[0].main === "Clouds") ? 'app clouds' :
          (weather.weather[0].main === "Drizzle") ? 'app drizzle' :
          (weather.weather[0].main === "Thunderstrom") ? 'app thunderstrom' : 'app') 
        : 'app'}>
      <main>
        <div className = "search-box">
          <input
            type = "text"
            className = "search-bar"
            placeholder = "Search..."
            onChange = {event => setQuery(event.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
  <div className="date">{dateBuilder(new Date())}</div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="low-hi">
            Low / High<br></br>
            {Math.round(weather.main.temp_min)}°C / {Math.round(weather.main.temp_max)}°C
          </div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
