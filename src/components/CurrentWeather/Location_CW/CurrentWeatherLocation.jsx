import React, { useState, useEffect } from 'react'
import CurrentWeatherCard from '../Card_CW/CurrentWeatherCard'
import Spinner from '../../Spinner/Spinner'
import UnsplashPhotos from '../../Unsplash/Unsplash'
import { useCity } from '../../../context/CityContext'

const API_KEY = '0948607ab7e1bc01187c1ce575da2606'

const CurrentWeatherByLocation = () => {
  const { updateCurrentCity } = useCity()
  const [myLocation, setMyLocation] = useState(null)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const [weatherByLocation, setWeatherByLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cityImage, setCityImage] = useState(null)

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            setMyLocation({ latitude, longitude })
          },
          (error) => {
            console.log(error)
            setPermissionDenied(true)
            setLoading(false)
          }
        )
      } else {
        console.log('No es posible la geolocalización en este navegador')
        setLoading(false)
      }
    }

    getLocation()
  }, [])

  useEffect(() => {
    if (myLocation !== null) {
      const { latitude, longitude } = myLocation

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=en`

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .then((data) => {
          setWeatherByLocation(data)
          setLoading(false)
          const imageUrl = data.weather[0].name
          setCityImage(imageUrl)
          updateCurrentCity(data)
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
    }
  }, [myLocation])

  const handleLocationRequest = () => {
    setPermissionDenied(false)
    setLoading(true)
    setMyLocation(null)
  }

  return (
    <>
      {permissionDenied ? (
        <p>¡Debes activar los permisos de geolocalización en tu navegador!</p>
      ) : loading ? (
        <Spinner />
      ) : weatherByLocation ? (
        <>
          <CurrentWeatherCard
            weather={weatherByLocation}
            showData={true}
            loading={loading}
            cityImage={cityImage}
          >
            <UnsplashPhotos query={weatherByLocation.weather[0].name} />
          </CurrentWeatherCard>
        </>
      ) : (
        <div>
          <button onClick={handleLocationRequest}>Obtener ubicación</button>
        </div>
      )}
    </>
  )
}

export default CurrentWeatherByLocation