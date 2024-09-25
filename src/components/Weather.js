import React, { useEffect, useState } from 'react';
import '../CSS/Home.scoped.css';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

function Weather() {
    const API_KEY = '7a1ab27f2a12b15fa7f0076acbfd5716';
    const [weather, setWeather] = useState(null);

    // 위치 가져오기
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                getWeatherByCurrentLocation(lat, lon);
            },
            (err) => {
                console.error('위치 정보를 가져오는 데 실패했습니다:', err);
            }
        );
    };

    const getWeatherByCurrentLocation = async (lat, lon) => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`;
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error('날씨 정보를 가져오는 데 실패했습니다.');
            }
            let data = await response.json();
            console.log("Received weather data:", data); // 데이터 확인
            setWeather(data); // 상태 업데이트
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    return (
        <div>
            <div className='weather'>
                <div className='weather_wrap'>
                    <h3>{weather ? weather.name : '위치'}</h3>
                    <h3>{weather ? `${weather.main.temp}℃` : '없음'}</h3>
                </div>
                <div className='weather_wrap'>
                    <h3>{weather ? weather.weather[0].description : '로딩중'}</h3>
                    <h3><WbSunnyIcon /></h3>
                </div>
            </div>
        </div>
    );
}

export default Weather;
