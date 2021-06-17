import React, { useState } from "react";
import ReactAnimatedWeather from "react-animated-weather";

const api = {
  key: "b5566fa1a3184ce5e0bd01d8063fefb1",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [forcast, setForcast] = useState([]);

  const clearDay = {
    icon: "CLEAR_DAY",
    color: "white",
    size: 128,
    animate: true,
  };
  const fog = {
    icon: "FOG",
    color: "white",
    size: 128,
    animate: true,
  };
  const partlyCloudy = {
    icon: "PARTLY_CLOUDY_DAY",
    color: "white",
    size: 128,
    animate: true,
  };
  const cloudy = {
    icon: "CLOUDY",
    color: "white",
    size: 128,
    animate: true,
  };
  const rain = {
    icon: "RAIN",
    color: "white",
    size: 128,
    animate: true,
  };
  const snow = {
    icon: "SNOW",
    color: "white",
    size: 128,
    animate: true,
  };

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
              <div className="currentWeatherImage">
                <ReactAnimatedWeather
                  icon={
                    weather.weather[0].main === "Clear"
                      ? clearDay.icon
                      : weather.weather[0].description === "few clouds" ||
                        weather.weather[0].description === "scattered clouds"
                      ? partlyCloudy.icon
                      : weather.weather[0].description === "overcast clouds" ||
                        weather.weather[0].description === "broken clouds"
                      ? cloudy.icon
                      : weather.weather[0].main === "Fog"
                      ? fog.icon
                      : weather.weather[0].main === "Snow"
                      ? snow.icon
                      : weather.weather[0].main === "Rain" ||
                        weather.weather[0].main === "Drizzle" ||
                        weather.weather[0].main === "Thunderstorm"
                      ? rain.icon
                      : ""
                  }
                  color="white"
                  size={192}
                  animate={true}
                ></ReactAnimatedWeather>
              </div>
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">
                with <br />
                {weather.weather[0].description}
              </div>
              <div className="humidity">
                {" "}
                <br />
                Humidity {weather.main.humidity}%
              </div>
              <div className="wind">
                {" "}
                Wind {Math.round(weather.wind.speed)} KPH
              </div>
            </div>
            <br />
            <div className="forcast-text"> 5-day forcast</div>
            <br />
            <div className="fiveDay">
              {forcast.map((fourcats) => (
                <div key={fourcats.dt}>
                  <div className="forcast-box">
                    <div className="day">
                      {fourcats.dt_txt.slice(6, 10)}
                      <div className="fiveDayImage">
                        <ReactAnimatedWeather
                          icon={
                            fourcats.weather[0].main === "Clear"
                              ? clearDay.icon
                              : fourcats.weather[0].description ===
                                  "few clouds" ||
                                fourcats.weather[0].description ===
                                  "scattered clouds"
                              ? partlyCloudy.icon
                              : fourcats.weather[0].description ===
                                  "overcast clouds" ||
                                fourcats.weather[0].description ===
                                  "broken clouds"
                              ? cloudy.icon
                              : fourcats.weather[0].main === "Fog"
                              ? fog.icon
                              : fourcats.weather[0].main === "Snow"
                              ? snow.icon
                              : fourcats.weather[0].main === "Rain" ||
                                fourcats.weather[0].main === "Drizzle" ||
                                fourcats.weather[0].main === "Thunderstorm"
                              ? rain.icon
                              : ""
                          }
                          color="white"
                          size={128}
                          animate={true}
                        ></ReactAnimatedWeather>
                        <div className="fiveDayTemp">
                          {Math.round(fourcats.main.temp)}°C
                          <div>{fourcats.weather[0].description} </div>
                        </div>
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
