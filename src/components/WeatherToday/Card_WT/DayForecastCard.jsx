import React, { useState } from 'react'
import './DayForecastCard.css'
import Spinner from '../../Spinner/Spinner'
import windIcon from '/assets/icons/wind.png'
import temperatureIcon from '/assets/icons/temperature.png'
import humidityIcon from '/assets/icons/humidity.png'

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

const DayForecastCard = ({ loading, forecast }) => {
  const { list } = forecast
  const [moreItems, setMoreItems] = useState([])

  const handleToggleDetails = (index) => {
    if (moreItems.includes(index)) {
      setMoreItems(moreItems.filter((item) => item !== index))
    } else {
      setMoreItems([...moreItems, index])
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = MONTHS[date.getMonth()]
    return `${month} ${day}${getDaySuffix(day)}`
  }

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

  if (!forecast || !forecast.city || !list || list.length === 0) {
    return null
  }

  return (
    
     <div className='ForecastCardContainer'>
      <div className='cityInfo'>
        <h2>
          Hourly forecast for{' '}
          <span>
            {forecast.city.name}, {forecast.city.country}
          </span>
        </h2>
        <h3>{myDate}</h3>
      </div>
      <table className='weatherTable'>
        <thead>
          <tr className='trHead'>
            <th>Time</th>
            <th>Temperature</th>
            <th>Description</th>
            <th>Precipitation</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {list.slice(0, 12).map((item, index) => {
            const isNewDay =
              list[index - 1] &&
              item.dt_txt.slice(11, 16) < list[index - 1].dt_txt.slice(11, 16)
            return (
              <React.Fragment key={index}>
                <tr className='weatherTableRow'>
                  {isNewDay && (
                    <td colSpan='5' className='newDayContainer'>
                      {formatDate(item.dt_txt)}
                    </td>
                  )}
                  {!isNewDay && (
                    <>
                      <td>{item.dt_txt.slice(11, 16)}</td>
                      <td>{(item.main.temp - 273.15).toFixed(1)}°</td>
                      <td>
                        <figure>
                          <img
                            src={iconMappings[item.weather[0].icon]}
                            alt='weatherIcon'
                          />
                          <figcaption>
                            {item.weather[0].description
                              .charAt(0)
                              .toUpperCase() +
                              item.weather[0].description.slice(1)}
                          </figcaption>
                        </figure>
                      </td>
                      <td>💧{item.pop.toFixed(1) * 100}%</td>
                      <td>
                        <i
                          className='toggleIcon'
                          onClick={() => handleToggleDetails(index)}
                        >
                          ⬇️
                        </i>
                      </td>
                    </>
                  )}
                </tr>
                {moreItems.includes(index) && (
                  <tr className='additionalInfoRow'>
                    <td colSpan='5'>
                      <div className='additionalInfo'>
                        <td className='additionalInfoDataContainer'>
                          <div className='iconAdditionalDataContainer'>
                            <img src={temperatureIcon} alt='FeelsLikeIcon' />
                          </div>
                          <h5>
                            Feels Like:{' '}
                            {(item.main.feels_like - 273.15).toFixed(1)}°C
                          </h5>
                        </td>
                        <td className='additionalInfoDataContainer'>
                          <div className='iconAdditionalDataContainer'>
                            <img src={humidityIcon} alt='HumidityIcon' />
                          </div>
                          <h5>Humidity: {item.main.humidity}%</h5>
                        </td>
                        <td className='additionalInfoDataContainer'>
                          <div className='iconAdditionalDataContainer'>
                            <img src={windIcon} alt='WindSpeedIcon' />
                          </div>
                          <h5>Wind speed: {item.wind.speed} m/s</h5>
                        </td>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>

  )
}

export default DayForecastCard