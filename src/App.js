import React, { useState } from "react";

const api = {
  key: "b5566fa1a3184ce5e0bd01d8063fefb1",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [forcast, setForcast] = useState([]);

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);

          console.log(result);
        });

      fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((fourcats) => {
          setForcast(fourcats.list.filter((e, i) => i % 8 === 0));
          setQuery("");
          console.log(forcast);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            className="search-bar"
            placeholder="Search..."
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <br />
            <div className="forcast-text"> 5-day forcast</div>
            <div className="fiveDay">
              {forcast.map((fourcats) => (
                <div key={fourcats.dt}>
                  <div className="forcast-box">
                    <div className="day">
                      {fourcats.dt_txt}
                      <div className="fiveDayTemp">
                        {Math.round(fourcats.main.temp)}°
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
