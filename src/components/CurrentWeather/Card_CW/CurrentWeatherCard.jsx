import React from 'react'
import Spinner from '../../Spinner/Spinner'
import './CurrentWeatherCard.css'
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
import Thermometer from '../Therm_CW/Thermometer'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

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

const CurrentWeatherCard = ({ loading, weather, children }) => {
  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return 'th'
    }
    const lastDigit = day % 10
    switch (lastDigit) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth()
  const year = today.getFullYear()
  const myDate = `${MONTHS[month]} ${day}${getDaySuffix(day)}, ${year}`

  if (loading) {
    return <Spinner />
  }

  if (
    !weather ||
    !weather.name ||
    !weather.sys ||
    !weather.weather ||
    weather.weather.length === 0
  ) {
    return null
  }

  const UnixTime = weather.dt
  const timezoneOffsetSeconds = weather.timezone
  const UnixTimeLocal = UnixTime + timezoneOffsetSeconds
  const localTime = new Date(UnixTimeLocal * 1000)
  const options = {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  }

  const localHour = localTime.toLocaleString('en-US', options)
  const iconCode = weather.weather[0].icon
  const weatherIcon = iconMappings[iconCode]

  return (
    <div className='cityCardContainer'>
      <div>
        <div className='imgCityContainer'>{children}</div>
        <div className='cityTitle'>
          <h2>{weather.name}</h2>
          <h3>{myDate}</h3>
          <h3>{localHour}</h3>
          <h4>{(weather.main.temp - 273.15).toFixed(1)}°C</h4>
        </div>
      </div>

      <div className='cityInfo'>
        <figure className='iconWeatherContainer'>
          <img src={weatherIcon} alt='weatherIcon' />
          <figcaption>
            {weather.weather[0].description.charAt(0).toUpperCase() +
              weather.weather[0].description.slice(1)}
          </figcaption>
        </figure>
        <div className='weatherInfo'>
          <Thermometer
            minTemperature={(weather.main.temp_min - 273.15).toFixed(1)}
            maxTemperature={(weather.main.temp_max - 273.15).toFixed(1)}
            feelsLike={(weather.main.feels_like - 273.15).toFixed(1)}
          />
          <div className='otherWeatherInfo'>
            <p>Humedad: {weather.main.humidity}%</p>
            <p>Visibilidad: {weather.visibility / 1000} km</p>
            <p>Viento: {weather.wind.speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeatherCard