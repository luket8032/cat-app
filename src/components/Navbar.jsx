import React from 'react'
import { SiGithub } from 'react-icons/si';
import catlogo from '../assets/mmocat.PNG'
import '../assets/css/nav.css'

const Navbar = () => {
  return (
      <div class='nav'>
        <div class='logo'>
          <img class='mmocat' src={catlogo} alt="catlogo"/>
          <ul class='navlist'>
            <li><a href="/" className='navlink'>Home</a></li>
            <li><a href="/findacat" className='navlink'>Find A Cat</a></li>
            <li><a href="/breeds" className='navlink'>Breeds</a></li>
            <li><a href="/about" className='navlink'>About</a></li>
          </ul>
          <button className='git-button'><SiGithub size={30} className='icon'/>GitHub</button>
        </div>
      </div>
  )
}

export default Navbar