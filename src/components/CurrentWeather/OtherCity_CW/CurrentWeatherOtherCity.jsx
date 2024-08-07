import React, { useState, useEffect } from 'react'
import CurrentWeatherCard from '../Card_CW/CurrentWeatherCard'
import UnsplashPhotos from '../../Unsplash/Unsplash'
import { useCity } from '../../../context/CityContext'

const API_key = '0948607ab7e1bc01187c1ce575da2606'

const CurrentWeatherOtherCity = () => {
  const { updateCurrentCity, location } = useCity()

  const [weatherByCity, setWeatherByCity] = useState([])
  const [loading, setLoading] = useState(false)
  const [showData, setShowData] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (location === '') {
        return
      }

      setLoading(true)

      const urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${API_key}&lang=en&q=${location}`

      try {
        const weatherDataResponse = await fetch(urlWeather)
        if (!weatherDataResponse.ok) {
          throw new Error(weatherDataResponse.statusText)
        }
        const weatherDataByCity = await weatherDataResponse.json()
        setWeatherByCity(weatherDataByCity)
        setLoading(false)
        setShowData(true)
        updateCurrentCity(weatherDataByCity)
        console.log(weatherDataByCity)
      } catch (error) {
        console.log(error)
        setLoading(false)
        setShowData(false)
      }
    }

    fetchData()
  }, [location])

  return (
    <div className='weatherPanelDisplay'>
      <CurrentWeatherCard
        showData={showData}
        loading={loading}
        weather={weatherByCity}
      >
        {showData && <UnsplashPhotos query={weatherByCity.name} />}
      </CurrentWeatherCard>
    </div>
  )
}

export default CurrentWeatherOtherCity