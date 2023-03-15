import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
dotenv.config()

const sendGridAPIKey = process.env.SEND_GRID_API_KEY ?? ''

sgMail.setApiKey(sendGridAPIKey)

function emailSender(to, from, subject, text, html) {
  const msg = {
    to: to ? to : 'munzarahmad@gmail.com',
    from: 'hamzazia2005@gmail.com',
    subject: subject,
    text: text,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error('sgMail error', error.response.body)
    })
}

export default emailSender
