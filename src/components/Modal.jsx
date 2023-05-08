import React from 'react'
import '../assets/css/findacat.css'

const Modal = ({ showModal, setShowModal, selectedImage }) => {
  return (
    <>
    {showModal ? 
    <div className='background'>
        <div className='modal-wrapper'>
            <img src={selectedImage} alt='selected'></img>
        </div>
    </div>
    : null
    }
    </>
  )
}

export default Modal