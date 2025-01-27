import "./styles.css";

function getWeather(location, unit) {
  let distanceUnit;
  let degreeUnit;
  if (unit !== "metric") {
    distanceUnit = "miles";
    degreeUnit = "fahrenheit";
  } else {
    distanceUnit = "kilometers";
    degreeUnit = "celsius";
  }
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;
  url = url.concat(location);
  let units = `?unitGroup=${unit}`;
  url = url.concat(units);
  let key = "&key=KGS8T3GXQGFV2C2AK2Q94UTU8";
  url = url.concat(key);
  console.log(url);

  fetch(`${url}`, { mode: "cors" })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      let windDir = getWindDirection(response.currentConditions.winddir);
      console.log(response);
      const locationHeading = document.querySelector("h2.location");
      locationHeading.textContent = response.resolvedAddress;
      const description = document.querySelector(".description");
      description.textContent = response.description;
      const weatherReport = document.querySelector("p.weather-report");
      weatherReport.textContent = `Currently, it's ${response.currentConditions.conditions}, ${response.currentConditions.temp} degrees ${degreeUnit} and feels like ${response.currentConditions.feelslike} degrees. The humidity is ${response.currentConditions.humidity} percent and the wind is from the ${windDir} at ${response.currentConditions.windspeed} ${distanceUnit} per hour, and gusting to ${response.currentConditions.windgust}.`;
    })
    .catch((e) => {
      console.log(e);
    });
}
getWeather("winnipeg", "metric");

function getWindDirection(angle) {
  const directions = [
    "north",
    "northeast",
    "east",
    "southeast",
    "south",
    "southwest",
    "west",
    "northwest",
  ];
  return directions[Math.round(angle / 45) % 8];
}

const submitBtn = document.querySelector("button#submit");
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const location = document.querySelector("input#location-search").value.trim();
  console.log(location);
  const units = document.querySelector("#units").value;
  getWeather(location, units);
});
