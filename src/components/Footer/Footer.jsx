import React from 'react'
import './Footer.css'
import githubLogo from '/assets/GithubLogo.png'
import linkedInLogo from '/assets/linkedin.png'
const githubRepoURL = 'https://github.com/Nannita1403/Proy_11_ReactBasic'
const linkedInURL = 'https://www.linkedin.com/in/nataliamagi/'

const Footer = () => {
  return (
    <footer>
      <div className='footerIcons'>
        <a href={githubRepoURL} target='_blank' rel='noopener noreferrer'>
          <img src={githubLogo} alt='GitHub' />
        </a>
        <a href={linkedInURL} target='_blank' rel='noopener noreferrer'>
          <img src={linkedInLogo} alt='LinkedIn' />
        </a>
      </div>
    </footer>
  )
}

export default Footer