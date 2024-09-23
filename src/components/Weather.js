import React from 'react'
import '../CSS/Home.scoped.css';
import { useEffect, useState } from 'react';

import WbSunnyIcon from '@mui/icons-material/WbSunny';

function Weather() {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState(null);

    //위치 가져오기
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeatherByCurrentLocation(lat, lon);
      });
    };
  
    const getWeatherByCurrentLocation = async (lat, lon) => {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=07c8f80150954d942a79882827366bc7&units=metric`;
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
    };
  
    useEffect(() => {
      getCurrentLocation();
    }, []);

    useEffect(() => {
        getCurrentLocation();
      }, []);
      
    return (
        <div>
            <div className='weather'>
            <div className='weather_wrap'>
                <h3>{weather?.name}</h3>
                <h3>{weather.main.temp}℃</h3>
            </div>
            <div className='weather_wrap'>
                <h3>{weather?.weather[0].description}</h3>
                <h3>{<WbSunnyIcon />}</h3>
            </div>
        </div>
        </div>
    )
}

export default Weather