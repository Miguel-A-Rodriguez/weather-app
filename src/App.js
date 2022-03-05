import React, { useEffect, useState } from 'react';
import './App.scss';
import DateTime from './components/dateTime';
  export default function App() {


    const [Latitude, setLatitude] = useState();
    const [Longitude, setLongitude] = useState();
    const [weatherData, setWeatherData] = useState();
    const [isLoading, setIsLoading] = useState(true);
   
   
    function GetCoordinates() {
      
        navigator.geolocation.getCurrentPosition(function(position) {
          
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        });
    }

    useEffect(() => {
      GetCoordinates();
    }, [])

     useEffect(() => {
      if(!Latitude || !Longitude) return
      let isMounted = true;
      const request = async () => {
        const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;
        const response = await fetch(weatherApi);
        
        const json = await response.json();
        if (json) {setIsLoading(false)};
        if (json) {setWeatherData(json)};

        
        //  setWeatherData(json);
        
      }

      request();

      // fetch(weatherApi)
      // .then(res => res.json())
      // .then(data => setWeatherData(data));
      // console.log(weatherData);

      console.log({Latitude});
      console.log({Longitude}); 

    }, [Latitude, Longitude]);

    console.log(weatherData);
    console.log(isLoading);
    console.log(weatherData);

    
return (
  <>
  <div className='App'>
    <div className='container'>
    {isLoading && <p>Wait I'm Loading comments for you</p>}
    {weatherData && [JSON.stringify(weatherData)].map(({ name, main }) => (
      <>
      <div className='flex-container'>
        <p className="city-name">{weatherData.name}</p>
        <p>{`Humidity: ${(weatherData.main.humidity)}%`}</p>
      </div>
      <div className='flex-container'>
      <p className="city-name">{`Temp:${weatherData.main.temp} °C`}</p>
      <p><DateTime/></p>
      </div>
      </>
    ))}
    </div>
  </div>
  </>
 )
}
