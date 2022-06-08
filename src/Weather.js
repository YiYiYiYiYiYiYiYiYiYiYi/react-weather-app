import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather (props){
    const [ready, setReady] = useState(false);
    const [weatherData, setWeatherData] = useState({});
    function handleResponse(response){
        setWeatherData(
            {
                temperature:response.data.main.temp,
                humidity:response.data.main.humidity,
                description: response.data.weather[0].description,
                wind: response.data.wind.speed,
                city: response.data.name,
                date: "Wednesday 07:00",
                iconUrl: `https://ssl.gstatic.com/onebox/weather/64/sunny.png`
            }
        );
        setReady(true);
    }

    if (ready){
        return (
            <div className="Weather">
                <form>
                    <div className="row">
                        <div className="col-9">
                    <input type="search" placeholder="Enter a city..." className="form-control" autoFocus="on"/>
                    </div>
                    <div className="col-3">
                    <input type="submit" value="Search" className="btn btn-primary w-100"/>
                    </div>
                    </div>
                </form>
                <h1>{weatherData.city}</h1>
                <ul>
                    <li>
                        {weatherData.date}
                    </li>
                    <li className="text-capitalize">
                        {weatherData.description}
                    </li>
                </ul>
                <div className="row">
                    <div className="col-6 mt-3">
                        <img src={weatherData.iconUrl} alt={weatherData.description}/>
                        <span className="temperature">{Math.round(weatherData.temperature)}</span>    
                        <span className="unit">°C</span> 
                    </div>
                    <div className="col-6">
                        <ul>
                            <li>
                                Humidity: {weatherData.humidity} %
                            </li>
                            <li>
                               Wind: {weatherData.wind} km/h
                            </li>
                        </ul>
        
                    </div>
        
                </div>
            </div>
            );
    }
    else {
        let apiKey = "17881ef8c7b51a3f397dbb41040ad179";
        let city = "New York";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse);
        return "Loading...";
    }  
}