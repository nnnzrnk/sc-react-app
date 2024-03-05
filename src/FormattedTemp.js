import React, { useState } from "react";

export default function FormattedTemp(props) {
  const [unit, setUnit] = useState("celsius");

  const fahrenheit = (props.celcius * 9) / 5 + 32;

  function convertFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function convertCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  if (unit === "celsius") {
    return (
      <div>
        <span className="temperature">{Math.round(props.celcius)}</span>
        <span className="units">
          <a href="/" onClick={convertFahrenheit}> °C
          </a>
        </span>
      </div>
    );
  } else {
    return (
      <div>
        <span className="temperature">{Math.round(fahrenheit)}</span>
        <span className="units fahrenheit">
          <a href="/" onClick={convertCelsius}>°F
          </a>
        </span>
      </div>
    );
  }
}
