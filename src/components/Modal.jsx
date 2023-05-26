import React, { useRef } from 'react'
import '../assets/css/findacat.css'
import {RiDownloadLine} from 'react-icons/ri'
import {saveAs} from "file-saver";

const Modal = ({ showModal, setShowModal, selectedImage }) => {
    const modalRef = useRef();

    /* close modal popup when you click outside of modal */
    const closeModal = e => {
        if(modalRef.current === e.target) {
            setShowModal(false);
        }
    }

    /* Download image when download button is clicked */
    const handleDownload = () => {
        let url = selectedImage
        saveAs(url, 'cat-img')
    }
  return (
    <>
    {showModal ? 
    <div className='background' ref={modalRef} onClick={closeModal}>
        <div className='modal-wrapper'>
            <img className='modal-img' src={selectedImage} alt='selected'></img>
        </div>
        <button className='text' onClick={handleDownload} download>Download<RiDownloadLine/></button>
    </div>
    : null
    }
    </>
  )
}

export default Modal