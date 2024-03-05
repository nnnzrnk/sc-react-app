import React, { useEffect, useState } from "react";
import axios from "axios";
import ForecastDay from "./ForecastDay";

export default function WeatherForecast(props) {
  const [forecast, setForecast] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
  }, [props.coordinates])

  function handleForecast(res) {
    setReady(true);
    setForecast(res.data.daily);
  }

  function load() {
    let key = "3d051a8309e26fa1a4485c467o137bdt";
    let lon = props.coordinates.longitude;
    let lat = props.coordinates.latitude;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${key}`;
    axios.get(apiUrl).then(handleForecast);
  }

  if (ready) {
    return (
      <section className="forecast">
        {forecast.map(function (day, index) {
          if (index < 5) {
            return(
                <ForecastDay key={index} forecast={day} />
            )
          } else{
            return null
          }
        })}
      </section>
    );
  } else {
    return load();
  }
}
