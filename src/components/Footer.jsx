import React from 'react'
import '../assets/css/footer.css'
import {SiLinkedin} from 'react-icons/si';

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer'>
        <ul>
          <li>Site by Luke Tran</li>
          <li>luket8032@hotmail.com</li>
          <li><a href="https://www.linkedin.com/in/luke-tran-1220171a9/"><SiLinkedin color='grey'/></a></li>
        </ul>
        
      </div>
    </div>
  )
}

export default Footer