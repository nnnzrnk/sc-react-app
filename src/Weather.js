import { useState } from "react";
import React from "react";
import "./Weather.css";
import axios from "axios";
import ClockLoader from "react-spinners/ClockLoader";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [weather, setWeather] = useState({ ready: false });

  function displayWeather(res) {
    setWeather({
      ready: true,
      coordinates: res.data.coordinates,
      temperature: res.data.temperature.current,
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
    axios.get(apiUrl).then((res) => {
      if (res.data.city) {
        displayWeather(res);
      } else {
        alert("City not found. Please enter a valid city name.");
      }
    });
  }

  function submitInput(event) {
    event.preventDefault();
    if (/^[a-zA-Z\s]+$/.test(city)) {
      search();
    } else {
      alert(
        "Please enter a valid city name containing only letters and spaces."
      );
    }
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

        <WeatherForecast coordinates={weather.coordinates} />

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
