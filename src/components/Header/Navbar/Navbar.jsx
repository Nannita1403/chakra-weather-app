import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

const Navbar = ({ showNavbar, handleShowNavbar }) => {
  return (
    <nav className='navbarContainer'>
      <div className={`navLinksWrapper ${showNavbar ? 'openContainer' : ''}`}>
            <NavLink 
            className={`navLink ${showNavbar ? 'openLink' : ''}`}
            to="" 
            activeclassname="active"
            onClick={handleShowNavbar}>
            Today
            </NavLink>

            <NavLink 
            className={`navLink ${showNavbar ? 'openLink' : ''}`}
            to="WeatherToday" 
            activeclassname="active"
            onClick={handleShowNavbar}>
            All the Day 
            </NavLink>

            <NavLink 
            className={`navLink ${showNavbar ? 'openLink' : ''}`}
            to="WeekForecast" 
            activeclassname="active"
            onClick={handleShowNavbar}>
            Week Forecast
            </NavLink>
    </div>
</nav>
  )
}

export default Navbar
