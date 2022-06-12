import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import FormattedDate from "./FormattedDate";
import WeatherTemperature from "./WeatherTemperature";

export default function Weather (props){
    const [ready, setReady] = useState(false);
    const [weatherData, setWeatherData] = useState({});
    const [city, setCity] = useState(props.defaultCity);
    function handleResponse(response){
        setWeatherData(
            {
                temperature:response.data.main.temp,
                humidity:response.data.main.humidity,
                description: response.data.weather[0].description,
                wind: response.data.wind.speed,
                city: response.data.name,
                date: new Date(response.data.dt*1000),
                iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
            }
        );
        setReady(true);
    }

    function search(){
        let apiKey = "17881ef8c7b51a3f397dbb41040ad179";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse);
    }

    function handleSubmit(event){
        event.preventDefault();
        search();
    }

    function handleChange(event){
        setCity(event.target.value);
    }

    if (ready){
        return (
            <div className="Weather">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-9">
                    <input type="search" placeholder="Enter a city..." className="form-control" autoFocus="on" onChange={handleChange}/>
                    </div>
                    <div className="col-3">
                    <input type="submit" value="Search" className="btn btn-primary w-100"/>
                    </div>
                    </div>
                </form>
                <h1>{weatherData.city}</h1>
                <ul>
                    <li>
                        <FormattedDate date={weatherData.date} />
                    </li>
                    <li className="text-capitalize">
                        {weatherData.description}
                    </li>
                </ul>
                <div className="row mt-3">
                    <div className="col-2 mt-3">
                        <img src={weatherData.iconUrl} alt={weatherData.description}/>
                    </div> 
                    <div className="col-6">
                        <WeatherTemperature celsius = {weatherData.temperature} />
                    </div>
                    <div className="col-4">
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
        search();
        return "Loading...";
    }  
}