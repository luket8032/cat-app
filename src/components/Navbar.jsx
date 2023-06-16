import React from 'react'
import { SiGithub } from 'react-icons/si';
import catlogo from '../assets/mmocat.png'
import '../assets/css/nav.css'

const Navbar = () => {
  return (
      <div class='nav'>
        <div class='logo'>
          <a href="/"><img class='mmocat' src={catlogo} alt="catlogo"/></a>
          <ul class='navlist'>
            <li><a href="/" className='navlink'>Home</a></li>
            <li><a href="/breeds" className='navlink'>Breeds</a></li>
            <li><a href="/contact" className='navlink'>Contact</a></li>
          </ul>
          <a href="https://github.com/luket8032/cat-app"><button className='git-button'><SiGithub size={30} className='icon'/>GitHub</button></a>
        </div>
      </div>
  )
}

export default Navbar