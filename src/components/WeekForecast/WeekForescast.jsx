import React, { useState, useEffect } from 'react'
import CityFilter from '../../components/Header/CityFilter/CityFilter'
import WeekForecastCard from './Card_WF/WeekForecastCard'
import { useCity } from '../../context/CityContext'

const API_key = '0948607ab7e1bc01187c1ce575da2606'

const WeekForecast = () => {
  const { updateCurrentCity, currentCity, location } = useCity()

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

        const filteredData = {
          ...forecastData,
          list: forecastData.list.filter((item, index) =>
            [0, 8, 15, 23, 31, 39].includes(index)
          )
        }
        setForecast(filteredData)
        setLoading(false)
        setShowData(true)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setShowData(false)
      }
    }

    fetchData()
  }, [fetchLocation])

  return (
    <>
      <WeekForecastCard
        showData={showData}
        loading={loading}
        forecast={forecast}
      />
    </>
  )
}

export default WeekForecast