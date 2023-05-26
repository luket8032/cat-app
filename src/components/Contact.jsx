import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Success from './Success.jsx'
import '../assets/css/contact.css'
import FadeLoader from "react-spinners/BeatLoader";

const Contact = () => {
  const form = useRef();
  const [sending, setSending] = useState(false);
  const[showSucess, setShowSucess] = useState(false);

  /* Function to send email with EmailJS */
  const sendEmail = (e) => {
    e.preventDefault(); /* prevents form from being submitted */
    setSending(true) /* Shows loader while email is being sent */
    emailjs.sendForm('service_zcen04b', 'template_w3farno', form.current, 'RnVT1zlkdz8VevDyP')
    .then((result) => {
      e.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setSending(false); /* Stops showing loader when email is sent */
      setShowSucess(true); /* Show success message if email is sent without error */
    })
  }

  return (
    <div className='container'>
      <h1>Contact us</h1>
      <form className='contactform' ref={form} onSubmit={sendEmail}>
        <label htmlFor="name">Name:</label>
        <input className='input' type="text" id='name' name='name' required />
        <label htmlFor="email">Email:</label>
        <input className='input' type="email" id='email' name='email' required />
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