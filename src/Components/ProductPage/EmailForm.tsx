import React from 'react'
import emailjs from '@emailjs/browser'
import { useParams } from 'react-router-dom'
import { setItemOrderStatus } from '../../hooks/useSupabaseData'
import './EmailForm.css'

export const EmailForm = ({ handleClose }: { handleClose: () => void }) => {
    const [emailSent, setEmailSent] = React.useState<boolean>(false)

    const form = React.useRef<any>()


    const { productId } = useParams()
    const markAsOrdered = () => {
        setItemOrderStatus(productId as string, true)
    }
    const sendConfirmationEmail = () => {
        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID as string, 'template_f1l8kb9', form.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // console.log('HIII', name, email, address, telNum, message)

        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID as string, 'template_prfqaua', form.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                sendConfirmationEmail()
                setEmailSent(true)
                markAsOrdered()
            }, (error) => {
                console.log(error.text);
            });

    }
    return <div className='form-wrapper'>{emailSent ? <div className="form-styler"><p>Thank you for your order! You should have received an email with your rder details</p><button className="submit-button" onClick={handleClose}>Close</button></div> : <form ref={form} id="contactForm" className="form-styler" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="to_name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="user_email" required />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" required />

        <label htmlFor="tel">Telephone Number:</label>
        <input type="number" id="tel" name="tel" required />

        <label htmlFor="message">Message:</label>
        <label className="small-label">(not required)</label>
        <textarea id="message" name="message" ></textarea>

        <button type="submit" className="submit-button">Submit</button>
    </form>}</div >
}

// onChange={(e) => setName(e.target.value)}
// onChange={(e) => setEmail(e.target.value)} />
// onChange={(e) => setAddress(e.target.value)} />
// onChange={(e) => setTelNum(e.target.value)}
// onChange={(e) => setMessage(e.target.value)}