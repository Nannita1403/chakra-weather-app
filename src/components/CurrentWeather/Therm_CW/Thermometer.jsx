import React from 'react'
import './Thermometer.css'

const Thermometer = ({ minTemperature, maxTemperature, feelsLike }) => {
  return (
    <div className='thermometer'>
      {/*<div className='maxTemp'></div>
      <div className='feelsLike'></div>
      <div className='minTemp'></div>*/}
      <div className='temperature'>
        <span className='maxText'>
         MAX: <em>{maxTemperature}</em> °C
        </span>
        <span className='feelsText'>
          FEEL: <em>{feelsLike}</em> °C
        </span>
        <span className='minText'>
          MIN: <em>{minTemperature}</em> °C
        </span>
      </div>
    </div>
  )
}

export default Thermometer