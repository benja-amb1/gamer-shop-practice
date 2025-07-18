import React from 'react'

const Contact = () => {
  return (
    <section id='contact'>
      <form>
        <h1>Contact</h1>

        <label htmlFor="name">Complete Name:</label>
        <input
          type="text"
          placeholder="Complete name"
        />

        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          placeholder="Subject"
        />

        <label htmlFor="message">Message:</label>
        <textarea cols="30" rows="10" placeholder='Message'></textarea>
        <button>Send</button>
      </form>
    </section>
  )
}

export { Contact }