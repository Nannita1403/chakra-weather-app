import React, { useState } from 'react'
import './WeekForecastCard.css'
import Spinner from '../../Spinner/Spinner'

import icon01d from '/assets/icons/01d.png'
import icon02d from '/assets/icons/02d.png'
import icon03d from '/assets/icons/03d.png'
import icon04d from '/assets/icons/04d.png'
import icon09d from '/assets/icons/09d.png'
import icon10d from '/assets/icons/10d.png'
import icon11d from '/assets/icons/11d.png'
import icon13d from '/assets/icons/13d.png'
import icon50d from '/assets/icons/50d.png'
import icon01n from '/assets/icons/01n.png'
import icon02n from '/assets/icons/02n.png'
import icon03n from '/assets/icons/03n.png'
import icon04n from '/assets/icons/04n.png'
import icon09n from '/assets/icons/09n.png'
import icon10n from '/assets/icons/10n.png'
import icon11n from '/assets/icons/11n.png'
import icon13n from '/assets/icons/13n.png'
import icon50n from '/assets/icons/50n.png'

const iconMappings = {
  '01d': icon01d,
  '02d': icon02d,
  '03d': icon03d,
  '04d': icon04d,
  '09d': icon09d,
  '10d': icon10d,
  '11d': icon11d,
  '13d': icon13d,
  '50d': icon50d,
  '01n': icon01n,
  '02n': icon02n,
  '03n': icon03n,
  '04n': icon04n,
  '09n': icon09n,
  '10n': icon10n,
  '11n': icon11n,
  '13n': icon13n,
  '50n': icon50n
}

const WeekForecastCard = ({ loading, forecast }) => {
  const { list } = forecast

  if (loading) {
    return <Spinner />
  }

  if (!forecast || !forecast.city || !list || list.length === 0) {
    return null
  }

  return (
    <div className='ForecastWeekCardContainer'>
      <h2>
        Weekly forecast for <br />
        <span>
          {forecast.city.name}, {forecast.city.country}
        </span>
      </h2>
      <ul className='weekForecastUl'>
        {list.map((item, index) => (
          <li className='weekForecastItem' key={index}>
            <h2>
              {item.dt_txt.slice(5, 7)}/{item.dt_txt.slice(8, 10)}
            </h2>
            <h3>{(item.main.temp - 273.15).toFixed(1)}°</h3>
            <figure className='iconWeekForecastContainer'>
              <img src={iconMappings[item.weather[0].icon]} alt='weatherIcon' />
              <figcaption>
                {item.weather[0].description.charAt(0).toUpperCase() +
                  item.weather[0].description.slice(1)}
              </figcaption>
            </figure>
            <p>💧{item.pop.toFixed(1) * 100}%</p>
            <h5>Feels Like: {(item.main.feels_like - 273.15).toFixed(1)}°C</h5>
            <h5>Humidity: {item.main.humidity}%</h5>
            <h5>Wind: {item.wind.speed} m/s</h5>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WeekForecastCard