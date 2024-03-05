import React from "react";
import AnimatedIcons from "./AnimatedIcons";

export default function ForecastDay(props) {

  function findDay() {
    let time = new Date(props.forecast.time * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = days[time.getDay()]
    return day
  }

  return (
    <div className="forecast-day">
      <p>{findDay()}</p>
      <AnimatedIcons icon={props.forecast.condition.icon} size={40} />
      <div className="forecast-temperature">
        <span>{Math.round(props.forecast.temperature.maximum)}°</span>
        <span>{Math.round(props.forecast.temperature.minimum)}°</span>
      </div>
    </div>
  );
}
