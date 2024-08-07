import React, { useState, useEffect } from 'react'

import DayForecastCard from '../Card_WT/DayForecastCard'
import './WeatherToday.css'
import { useCity } from '../../../context/CityContext'

const API_key = '0948607ab7e1bc01187c1ce575da2606'

const WeatherToday = () => {
  const { currentCity, updateCurrentCity, location } = useCity()

  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [showData, setShowData] = useState(false)
  const [fetchLocation, setFetchLocation] = useState(
    location ? location : currentCity.name
  )

  useEffect(() => {
    setFetchLocation(location || currentCity.name)
  }, [location, currentCity.name])

  useEffect(() => {
    const fetchData = async () => {
      if (fetchLocation === '') {
        return
      }

      setLoading(true)

      const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_key}&lang=en&q=${fetchLocation}`

      try {
        const forecastDataResponse = await fetch(urlForecast)
        if (!forecastDataResponse.ok) {
          throw new Error(forecastDataResponse.statusText)
        }
        const forecastData = await forecastDataResponse.json()
        setForecast(forecastData)
        setLoading(false)
        setShowData(true)
        console.log(forecastData)
        // updateCurrentCity(forecastData)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setShowData(false)
      }
    }

    fetchData()
  }, [fetchLocation])

  return (
    <div className='weatherTodayContainer'>
      <DayForecastCard
        showData={showData}
        loading={loading}
        forecast={forecast}
      />
    </div>
  )
}

export default WeatherToday