import CityFilter from "./CityFilter/CityFilter"
import "./Header.css"
import Navbar from "./Navbar/Navbar.jsx"
import companyLogo from "/assets/companyLogo.png"
import menu from '/assets/icons_web/menu.png'
import cross from '/assets/icons_web/cross.png'
import { useEffect, useState } from "react"


const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="header">
        <div className='companyName'>
        <div className='companylogoWrapper'>
          <img src={companyLogo} alt='companyLogo'/>
        </div>
        <p>Chakra Weather</p>
        </div>
      <CityFilter />
      {windowWidth >= 1023 ? (
        <Navbar showNavbar={showNavbar} />
      ) : (
        <>
          <div className='MenuIconContainer' onClick={handleShowNavbar}>
            <img src={showNavbar ? cross : menu} alt='Menu' />
          </div>
          {showNavbar && (
            <Navbar
              showNavbar={showNavbar}
              handleShowNavbar={handleShowNavbar}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Header
