import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Success from './Success.jsx'
import '../assets/css/contact.css'
import FadeLoader from "react-spinners/BeatLoader";

const Contact = () => {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const[test, setTest] = useState(true);
  const[showSucess, setShowSucess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true)
    emailjs.sendForm('service_zcen04b', 'template_w3farno', form.current, 'RnVT1zlkdz8VevDyP')
    .then((result) => {
      e.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setSending(false);
      setShowSucess(true);
    })
  }

  return (
    <div className='container'>
      <h1>Contact us</h1>
      <form className='contactform' ref={form} onSubmit={sendEmail}>
        <label htmlFor="user_name">Name:</label>
        <input className='input' type="text" id='user_name' name='user_name' required />
        <label htmlFor="user_email">Email:</label>
        <input className='input' type="email" id='user_email' name='user_email' required />
        <label htmlFor="message">Message:</label>
        <textarea className='input' name="message" id="message" cols="30" rows="10" required></textarea>
        <div className='btn-container'>
          {!sending ? <button className='contact-btn' id='submitform'>Send</button> : null}
          {sending ? <FadeLoader/> : null}
        </div>
      </form>
      <Success className='close' showSuccess={showSucess} setShowSucess={setShowSucess}/>
    </div>
  )
}

export default Contact