import React, { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {

    const [formData,setFormData] = useState(
        {
            username : '',
            email : "",
            subject : "",
            message : ''
        }
    )

    const handleInputChange= (e) => {
        const {name,value} = e.target;
        setFormData(
            {
                ...formData,
                [name] : value
            }
        )
    }

    const submitContact = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/contact/",formData);
            if(res.status === 201){
                setFormData(
                    {
                        username : '',
            email : "",
            subject : "",
            message : ''
                    }
                )
            }
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <>

    <section className="in-contact-section" id='contact'>
              <div className="in-container">
                <div className="in-section-header">
                  <h2>Contact Us</h2>
                  <p className="in-section-subtitle">
                    Get in touch with our team for more information
                  </p>
                </div>
                <div className="in-contact-content">
                  <div className="in-contact-info">
                    <div className="in-contact-item">
                      <FaPhone className="in-contact-icon" />
                      <div>
                        <h3>Phone</h3>
                        <p>+91 94913 01258</p>
                      </div>
                    </div>
                    <div className="in-contact-item">
                      <FaEnvelope className="in-contact-icon" />
                      <div>
                        <h3>Email</h3>
                        <p>tsarit@tsaritservices.com</p>
                      </div>
                    </div>
                    <div className="in-contact-item">
                      <FaMapMarkerAlt className="in-contact-icon" />
                      <div>
                        <h3>Address</h3>
                        <p>12-203/745, CHURCH STREET, NAKKABANDA,<br />Punganur, Madanapalle, Chittoor- 517247, <br />Andhra Pradesh </p>
                      </div>
                    </div>
                  </div>
                  <form className="in-contact-form" onSubmit={submitContact}>
                    <div className="in-form-group">
                      <input type="text" placeholder="Your Name" required  name='username' onChange={handleInputChange} value={formData.username}/>
                      <input type="email" placeholder="Your Email" required name='email' onChange={handleInputChange} value={formData.email}/>
                    </div>
                    <input type="text" placeholder="Subject" required name='subject' onChange={handleInputChange} value={formData.subject}/>
                    <textarea placeholder="Your Message" rows="5" required name='message' onChange={handleInputChange} value={formData.message}></textarea>
                    <button type="submit" className="in-btn in-btn-primary" >Send Message</button>
                  </form>
                </div>
              </div>
            </section>
            
    </>
  )
}

export default Contact