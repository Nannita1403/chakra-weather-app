import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CityProvider } from './context/CityContext.jsx'
import Home from './pages/Home/Home.jsx'
import WeatherTodayPage from './pages/WeatherTodayPage/WeatherTodayPage.jsx'
import WeekForecastPage from './pages/WeekForecastPage/WeekForecastPage.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <BrowserRouter basename='/'>
  <CityProvider>
     <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}></Route>
          <Route path="WeatherToday" element={<WeatherTodayPage />}></Route>
          <Route path="WeekForecast" element={<WeekForecastPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
  </CityProvider>
 </BrowserRouter>
</React.StrictMode>
)

