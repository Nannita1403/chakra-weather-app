import React, { useState } from 'react'
import { cities } from '/src/utils/Cities.jsx'
import './CityFilter.css'
import search from '/assets/icons_web/search.png'
import { useCity } from '/src/context/CityContext'

const CityFilter = () => {
  const { updateLocation } = useCity()
  const [searchCity, setSearchCity] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    setSearchCity(inputValue)
    const filteredSuggestions = inputValue
      ? cities.filter((city) =>
          city.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      : []
    setSuggestions(filteredSuggestions)
    setSelectedIndex(-1)
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchCity(suggestion)
    setSuggestions([])
    setSelectedIndex(-1)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (searchCity.trim() !== '') {
      searchCity
      setSearchCity('')
      setSuggestions([])
      setSelectedIndex(-1)
      updateLocation(searchCity)
    }
  }

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
      )
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      )
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex !== -1) {
        handleSuggestionClick(suggestions[selectedIndex])
      }
    }
  }

  return (
    <div className='cityFilterContainer'>
      <form className='form-container' onSubmit={onSubmit}>
        <label className='searchCityLabel'>
          <input
            type='text'
            className='searchCityInput'
            placeholder='Introduce your city'
            value={searchCity}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </label>
        <button className='submitButton' type='submit'>
          <img src={search} alt='CitySearchIcon' />
        </button>
      </form>

      {suggestions.length > 0 && (
        <div
          className='suggestionsContainer'
          style={{
            top: `calc(100% + 10px)`,
            display: suggestions.length > 0 ? 'block' : 'none'
          }}
        >
          <ul className='suggestionsList'>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  backgroundColor:
                    selectedIndex === index ? '#f1f1f1' : 'transparent'
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CityFilter