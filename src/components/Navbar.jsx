import React from 'react'
import catlogo from '../assets/mmocat.png'
import '../App.css';

const Navbar = () => {
  return (
    <div>
      <div class='logo'>
      <img class='mmocat-icon' src={catlogo} alt="catlogo"/>
      <h1 class='logo-text'>MMOCat</h1>
      </div>

      <div>
        <ul className='flex'>

        </ul>
      </div>
    </div>
  )
}

export default Navbar