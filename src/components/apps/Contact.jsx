import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import './AppStyles.css'

const Contact = () => {
  const form = useRef()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Initialize EmailJS - these values come from your EmailJS account
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

  const handleInputChange = (e) => {
    const { name, value } = e.target
    // Map EmailJS field names back to our state
    const fieldMap = {
      'from_name': 'name',
      'from_email': 'email',
      'subject': 'subject',
      'message': 'message'
    }
    const stateField = fieldMap[name] || name
    
    setFormData({
      ...formData,
      [stateField]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY
      )

      console.log('Email sent successfully:', result.text)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Failed to send email:', error)
      setError('Failed to send message. Please try again or contact me directly at rndas2004@gmail.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      value: "rndas2004@gmail.com",
      action: () => window.open('mailto:rndas2004@gmail.com')
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "https://www.linkedin.com/in/ritesh-narayan-das-6196b3268/",
      action: () => window.open('https://www.linkedin.com/in/ritesh-narayan-das-6196b3268/', '_blank')
    },
    {
      icon: "🐱",
      title: "GitHub",
      value: "github.com/rndastech",
      action: () => window.open('https://github.com/rndastech', '_blank')
    }
  ]

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>📧 Get In Touch</h1>
        <p>Let's connect and discuss opportunities or collaborations</p>
      </div>
      
      <div className="app-content">
        <div className="contact-layout">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p className="contact-intro">
              I'm always interested in new opportunities, whether it's a intern position, 
              freelance project, or just a chat about technology. Feel free to reach out!
            </p>

            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <div 
                  key={index} 
                  className="contact-method"
                  onClick={method.action}
                  style={{ cursor: method.action ? 'pointer' : 'default' }}
                >
                  <span className="contact-icon">{method.icon}</span>
                  <div className="contact-details">
                    <h4>{method.title}</h4>
                    <p>{method.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="availability">
              <h4>🟢 Available for new opportunities</h4>
              <p>Currently open to interesting freelance projects.</p>
            </div>
          </div>

          <div className="contact-form-container">
            <h3>Send a Message</h3>
            
            {submitted && (
              <div className="success-message">
                <span className="success-icon">✅</span>
                <p>Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            {error && (
              <div className="error-message">
                <span className="error-icon">❌</span>
                <p>{error}</p>
              </div>
            )}

            <form className="contact-form" ref={form} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="from_name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="from_email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project or opportunity..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className="send-icon">🚀</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="contact-footer">
          <div className="response-time">
            <span className="clock-icon">⏰</span>
            <p>I typically respond within 24 hours</p>
          </div>
          <div className="timezone">
            <span className="globe-icon">🌍</span>
            <p>Based in India (UTC + 5:30)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
