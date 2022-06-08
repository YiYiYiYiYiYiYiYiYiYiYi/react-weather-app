import React from "react"
import './App.css';
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        
        <Weather defaultCity="Paris"/>
        <footer>
          This project was coded by Yi and is {" "}
          <a Href="https://github.com/YiYiYiYiYiYiYiYiYiYiYi/react-weather-app" target="_blank"> 
          open-sourced on GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}


