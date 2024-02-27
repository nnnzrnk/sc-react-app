import { useState } from "react";
import React from "react";
import "./Weather.css";
import axios from "axios";

export default function Form() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({}) 

  function displayWeather(res){
    console.log(res.data)
    setWeather({
      temperature: Math.round(res.data.main.temp),
      city: res.data.name, 
      humidity: res.data.main.humidity,
      wind: Math.round(res.data.wind.speed),
      description: res.data.weather[0].description,
      img: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
    })
  }

  function submitInput(event){
    event.preventDefault()
    let appid = "bd5b4461863eddaa6ced0a0a67989e0a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`;
    let apiForecast =`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${appid}`
    axios.get(apiUrl).then(displayWeather)
  }

  function handleInput(event){
    setCity(event.target.value)
  }

  const form = (
      <form className="search-form" onSubmit={submitInput}>
        <input
          type="search"
          placeholder="Enter a city..."
          className="form-control shadow-sm"
          onChange={handleInput}
        />
        <input type="submit" value="Search" className="btn shadow-sm" />
      </form>
  )

  return (
    <div className="weather-app">
      {form}
      <div className="line"></div>
      <main>
        <div>
          <h1>{weather.city}</h1>
          <p className="weather-details">
            <span>{weather.date}</span>
            <span>{weather.description}</span>
            <br />
            Humidity: <strong>{weather.humidity}%</strong>,
            Wind: <strong>{weather.wind}km/h</strong>
          </p>
        </div>
        <img src={weather.img} alt="current weather image" />
        <div>
          <span className="temperature">
            {weather.temperature}
          </span>
          <span className="units">°C</span>
        </div>
      </main>

    </div>
  );
}
