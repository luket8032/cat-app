import React from 'react'
import catlogo from '../assets/mmocat.png'
import '../App.css';

const Navbar = () => {
  
  return (
    <div class='nav'>
      <div class='logo'>
        <img class='mmocat' src={catlogo} alt="catlogo"/>
      
        <ul class='navlist'>
          <li><a href="/" className='navlink'>Home</a></li>
          <li><a href="/news" className='navlink'>News</a></li>
          <li><a href="/games" className='navlink'>Games</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar