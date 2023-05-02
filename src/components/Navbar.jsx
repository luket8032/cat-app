import React from 'react'
import { SiGithub } from 'react-icons/si';
import catlogo from '../assets/mmocat.png'
import '../assets/css/nav.css'

const Navbar = () => {
  
  return (
      <div class='nav'>
        <div class='logo'>
          <img class='mmocat' src={catlogo} alt="catlogo"/>
          <ul class='navlist'>
            <li><a href="/" className='navlink'>Home</a></li>
            <li><a href="/news" className='navlink'>News</a></li>
            <li><a href="/games" className='navlink'>Games</a></li>
            <li><a href="/about" className='navlink'>About</a></li>
          </ul>
          <button className='git-button'><SiGithub size={30} className='icon'/>GitHub</button>
        </div>
      </div>
  )
}

export default Navbar