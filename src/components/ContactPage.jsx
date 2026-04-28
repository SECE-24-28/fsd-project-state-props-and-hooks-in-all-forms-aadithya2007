import { useState } from "react";
import contactHeroImage from "../assets/page-images/contact-hero.svg";
import "../CSS/ContactPage.css";

const contactDetails = [
  ["Phone", "+91 98765 43210"],
  ["Email", "support@vegimart.com"],
  ["Address", "123 Green Street, Farm Valley, Chennai - 600001"],
  ["Working Hours", "Monday - Saturday, 8:00 AM - 9:00 PM"],
];

function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    // Get existing messages
    const existingMessages =
      JSON.parse(localStorage.getItem("contactMessages")) || [];

    // Add new message
    const updatedMessages = [
      ...existingMessages,
      {
        ...formData,
        submittedAt: new Date().toISOString(),
      },
    ];

    // Save to localStorage
    localStorage.setItem(
      "contactMessages",
      JSON.stringify(updatedMessages)
    );

    alert("Thanks for contacting VegiMart. We will get back to you soon.");

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });

    setErrors({});
  };

  return (
    <main className="page contact-page">
      <section className="split-hero">
        <div className="hero-text">
          <h1>Contact Us</h1>
          <p>
            We would love to hear from you. Get in touch with VegiMart for any
            questions, support, or feedback.
          </p>
        </div>

        <div className="hero-image">
          <img src={contactHeroImage} alt="Fresh groceries" />
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-info">
          <h2>Get In Touch</h2>

          {contactDetails.map(([title, text]) => (
            <article className="info-box" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <div className="contact-form">
          <h2>Send Message</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <span className="error">{errors.fullName}</span>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="error">{errors.email}</span>
            )}

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && (
              <span className="error">{errors.subject}</span>
            )}

            <textarea
              name="message"
              placeholder="Write your message..."
              rows="6"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <span className="error">{errors.message}</span>
            )}

            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      <section className="map-section centered">
        <h2>Our Location</h2>
        <div className="map-box">
          <p>123 Green Street, Farm Valley, Chennai - 600001</p>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
