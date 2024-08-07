
import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Main from './pages/Main/Main'

const App = () => {
  return (
    <main
    style={{
      width: '100%',
      height: '100vh'
    }}>
      <Header/>
      <Main/>
      <Footer/>
    </main>
  )
}

export default App