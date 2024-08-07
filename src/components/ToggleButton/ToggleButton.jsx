import React from 'react'

const ToggleButton = ({ text, onClick }) => {
  return (
    <button className='buttonToggle' onClick={onClick}>
      {text}
    </button>
  )
}

export default ToggleButton