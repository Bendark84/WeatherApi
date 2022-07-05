import React, { useEffect, useState } from "react";
import axios from 'axios'


const WeatherApi = () => {

  const [data, setData] = useState({})

  const [istemp, setIsTemp] = useState(true);

  const [temperature, setTemperature] = useState()

  let city = data.name
  let country = data.sys?.country
  let windSpeed = data.wind?.speed
  let clouds = data.clouds?.all
  let pressure = data.main?.pressure
  let weatherDescription = data.weather?.[0].description

  useEffect(() => {
    setTemperature(Math.round(data.main?.temp - 273.15));
    setIsTemp(istemp);
  }, []);

  const convertTemp = () => {

    if (istemp) {

      setTemperature(Math.round(data.main.temp - 273.15));
      setIsTemp(false);

    } else {

      setTemperature(Math.round((((data.main.temp) - 273.15) * 9 / 5) + 32));
      setIsTemp(true);

    }

  }



  useEffect(() => {

    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=662cdef51a3fca4519a59cfbe31550f8`)
        .then(res => setData(res.data))

    }

    navigator.geolocation.getCurrentPosition(success);

  }, [])

  console.log(data)




  return (
    <div className="App">
      <div className="card-weather">
        <h1>Wheather App</h1>
        <h2>{city},{country}</h2>
        <div className="icon">
          <img src={` http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="" />
          <p> <small> {temperature} {istemp ? "°F" : "°C"} </small> <strong> temperature </strong>  </p>
        </div>

        <h3>{weatherDescription}</h3>
        <ul>

          <div className="description">

            <div className="wind">
              <li>Wind : {windSpeed} km</li>
              <i class="fa-solid fa-wind"></i>
            </div>

            <div className="cloud">
              <li>Clouds : {clouds}</li>
              <i class="fa-solid fa-cloud"></i>
            </div>



            <div className="pressure">
              <li>pressure: {pressure}</li>
              <i class="fa-solid fa-temperature-half"></i>
            </div>
          </div>
        </ul>


        <button onClick={convertTemp}>Degrees F/C</button>



      </div>



    </div>
  )
}

export default WeatherApi;