import { useState } from "react";
import React from "react";
import "./Weather.css";
import axios from "axios";
import ClockLoader from "react-spinners/ClockLoader";
import WeatherInfo from "./WeatherInfo";

export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [weather, setWeather] = useState({ ready: false });

  function displayWeather(res) {
    console.log(res.data)
    setWeather({
      ready: true,
      temperature: Math.round(res.data.temperature.current),
      city: res.data.city,
      humidity: res.data.temperature.humidity,
      wind: Math.round(res.data.wind.speed),
      description: res.data.condition.description,
      img: res.data.condition.icon,
      date: new Date(res.data.time * 1000),
    });
  }

  function search() {
    let key = "3d051a8309e26fa1a4485c467o137bdt";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}`;
    axios.get(apiUrl).then(displayWeather);
  }

  function submitInput(event) {
    event.preventDefault();
    search();
  }

  function handleInput(event) {
    setCity(event.target.value);
  }

  if (weather.ready) {
    return (
      <div className="weather-app">
        <form className="search-form" onSubmit={submitInput}>
          <input
            type="search"
            placeholder="Enter a city..."
            className="form-control shadow-sm"
            onChange={handleInput}
            autoFocus="on"
          />
          <input type="submit" value="Search" className="btn shadow-sm" />
        </form>
        <div className="line"></div>

        <WeatherInfo weather={weather} />

        <footer>
          <div className="line"></div>
          <p className="footer-text">
            The project was created for educational purposes. The information
            provided may not be accurate.
          </p>
        </footer>
      </div>
    );
  } else {
    search();
    return (
      <ClockLoader
        color="#4a5759"
        loading="true"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
}
