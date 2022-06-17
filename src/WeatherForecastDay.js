import React from "react";

export default function WeatherForecastDay (props){
    let imgUrl = `http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`;

    function day() {
        let date = new Date (props.data.dt*1000);
        let day = date.getDay ();
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[day];
    }

    return (
        <div>
            <div className="WeatherForecast-day">{day()}</div>
            <img src={imgUrl} alt="icon"/>
            <div className="WeatherForecast-temperatures">
            <span className="WeatherForecast-max">
                {Math.round(props.data.temp.max)}°
            </span>
            <span className="WeatherForecast-min">
                {Math.round(props.data.temp.min)}°
            </span>
            </div>
        </div>
    )

}