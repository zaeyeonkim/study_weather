import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';


// 1. 앱 실행을 하면 현재 위치 기반 날씨가 보임\
// 2. 날씨 정보에는 도시, 섭/화씨의 날씨 상태
// 3. 5개의 버튼(1개는 현위치, 4개는 도시)
// 4. 도시 버튼 클릭때마다 도시별 날씨가 나옴
// 5. 현재 위치 버튼은 다시 현재위치 기반 날씨가 나옴
// 6. 데이터를 들고오는 동안 로딩스피너가 활성화

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const cities = ["Seoul", "New york", "Madrid", "London"];

  const getCurrentLocation =  () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherbyCurrentLocation(lat,lon);
    });
  }

  const getWeatherbyCurrentLocation = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b823a518bfda32054e0a1f8315a8bacc&units=metric`;
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data);
  };
  const getWeatherByCity = async() => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b823a518bfda32054e0a1f8315a8bacc&units=metric`;
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data);
  }

  useEffect(() => {
    if (city == "") {
      getCurrentLocation ();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div className="container">
      <WeatherBox weather={weather} />
      <WeatherButton cities={cities} setCity={setCity} />
    </div>
  );
}

export default App;
