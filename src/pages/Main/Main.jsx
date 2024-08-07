import React from 'react'
import { Outlet } from 'react-router-dom'
import './Main.css'
const Main = () => {
  return (
    <section>
      <Outlet />
    </section>
  )
}

export default Main