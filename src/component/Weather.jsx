import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import { useEffect, useRef } from "react";
import { useState } from "react";
export default function Weather() {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const search = async (city) => {
    if(city === " ") {
        alert("Enter Country Name")
        return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const res = await fetch(url);
      const data = await res.json();
      if(!res.ok){
        alert(data.message)
        return;
      }
      console.log(data.main.humidity);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
        setWeatherData(false);
        console.error("Error in fetching weather data")
    }
  };
  useEffect(() => {
    search();
  }, []);
  return (
    <div className="flex flex-col items-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-4 place-self-center">
      <form onSubmit={() =>{search()}} className="flex items-center gap-3 mt-3">
        <input
          ref={inputRef}
          className="rounded-full border-none outline-none h-25 pt-1 pb-1 pl-5 pr-3 text-slate-500 text-lg"
          type="text"
          placeholder="Search"
        />
        <img
          onClick={() => {
            search(inputRef.current.value);
          }}
          className="w-9 rounded-full p-2 bg-white cursor-pointer "
          src={search_icon}
          alt=""
        />
      </form>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="w-28 mt-7 mb-7" />
          <p className="leading-none text-white text-3xl font-bold">
            {weatherData.temperature} C
          </p>
          <p className="text-white text-3xl font-bold mt-3">
            {weatherData.location}
          </p>
          <div className="w-full mt-4 mb-3 text-white flex justify-between">
            <div className="flex items-start gap-3 text-[22px]">
              <img className="mt-5 w-7" src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span className="block text-[16px]">Humidity</span>
              </div>
            </div>
            <div className="flex items-start gap-3 text-[22px]">
              <img className="mt-5 w-7" src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span className="block text-[16px]">Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
