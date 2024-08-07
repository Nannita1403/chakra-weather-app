import React, { createContext, useContext, useState } from 'react'

const CityContext = createContext()

export const useCity = () => {
  return useContext(CityContext)
}

export const CityProvider = ({ children }) => {
  const [currentCity, setCurrentCity] = useState(() => {
    const localCurrentCity = localStorage.getItem('currentCity')
    return localCurrentCity ? JSON.parse(localCurrentCity) : null
  })
  const [location, setLocation] = useState('')

  const updateCurrentCity = (city) => {
    setCurrentCity(city)
    localStorage.setItem('currentCity', JSON.stringify(city))
  }

  const updateLocation = (newLocation) => {
    setLocation(newLocation)
  }

  return (
    <CityContext.Provider
      value={{ currentCity, updateCurrentCity, location, updateLocation }}
    >
      {children}
    </CityContext.Provider>
  )
}