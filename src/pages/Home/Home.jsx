import React, { useState } from 'react'

import CurrentWeatherOtherCity from '../../components/CurrentWeather/OtherCity_CW/CurrentWeatherOtherCity'
import { useCity } from '../../context/CityContext'
import DaySunImage from '/assets/DaySun.png'
import NightMoonImage from '/assets/NightMoon.png'
import "./Home.css"
import CurrentWeatherByLocation from '../../components/CurrentWeather/Location_CW/CurrentWeatherLocation'

const Home = () => {
  const { location, currentCity } = useCity()

  const isDaytime =
    currentCity &&
    currentCity.dt >= currentCity.sys.sunrise &&
    currentCity.dt <= currentCity.sys.sunset

  return (
    <div className='nowContainer'>
    <article className='currentWeatherArticle'>
      {location ? <CurrentWeatherOtherCity /> : <CurrentWeatherByLocation />}
    </article>
    
  </div>
)
}

export default Home
