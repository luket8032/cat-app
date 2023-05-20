import React, { useRef } from 'react'
import '../assets/css/success.css'

const Success = ({showSuccess, setShowSucess}) => {
    const modalRef = useRef();

    const closeModal = e => {
        if(modalRef.current === e.target) {
            setShowSucess(false);
        }
    }

    const btnCloseModal = () => {
        setShowSucess(false);
    };

  return (
    <>
    {showSuccess ?
        <div className='background' ref={modalRef} onClick={closeModal}>
            <div className='success-msg'>
                <h1>Message sent successfully! :D</h1>
                <button className='success-btn' onClick={btnCloseModal}>Close</button>
            </div>
        </div> : null
    }
    </>
  )
}

export default Success