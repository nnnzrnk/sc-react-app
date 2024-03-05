import React from "react";
import "./Weather.css";
import FormattedDate from "./FormattedDate";
import AnimatedIcons from "./AnimatedIcons";
import FormattedTemp from "./FormattedTemp";


export default function WeatherInfo(props) {
  return (
    <main>
      <div>
        <h1>{props.weather.city}</h1>
        <p className="weather-details">
          <span>
            <FormattedDate date={props.weather.date} />{" "}
          </span>
          <span>{props.weather.description}</span>
          <br />
          Humidity: <strong>{props.weather.humidity}%</strong>, Wind:{" "}
          <strong>{props.weather.wind}km/h</strong>
        </p>
      </div>
      <div className="animated-icon">
        <AnimatedIcons icon={props.weather.img} />
      </div>
      <FormattedTemp celcius={props.weather.temperature} />
    </main>
  );
}
