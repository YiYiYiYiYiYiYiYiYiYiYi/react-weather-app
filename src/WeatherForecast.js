import axios from "axios";
import React, { useEffect, useState } from "react";
import "./WeatherForecast.css";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast (props) {  
    let [loaded, setLoaded] = useState(false);
    let [forecast, setForecast] = useState(null);

    useEffect (() => {
        setLoaded(false);
    }, [props.coordinates]
    );
    
    function handleResponse (response){
       setForecast(response.data.daily);
       setLoaded(true);
    }

    if (loaded){
        return (
            <div className="weatherForecast">
                <div className="row">
                    {forecast.map(function(dailyForecast, index){
                        if (index < 5){
                            return (
                                <div className="col" key={index}>
                                    <WeatherForecastDay data={dailyForecast}/>
                                </div>
                            );
                        }
                        else {
                            return null;
                        }
                    })}   
                </div>
            </div>
        );      
    }
    else {
        let apiKey = "17881ef8c7b51a3f397dbb41040ad179";
        let lat = props.coordinates.lat;
        let lon = props.coordinates.lon;
        let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(handleResponse);
        return null;
    }
}