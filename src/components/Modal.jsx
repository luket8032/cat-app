import React, { useRef } from 'react'
import '../assets/css/findacat.css'

const Modal = ({ showModal, setShowModal, selectedImage }) => {
    const modalRef = useRef();

    const closeModal = e => {
        if(modalRef.current === e.target) {
            setShowModal(false);
        }
    }
  return (
    <>
    {showModal ? 
    <div className='background' ref={modalRef} onClick={closeModal}>
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