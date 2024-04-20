import React from 'react'
import emailjs from '@emailjs/browser'
import { useParams } from 'react-router-dom'
import { setItemOrderStatus, orderAlbum as sendAlbumOrder } from '../../hooks/useSupabaseData'
import './EmailForm.css'

export const EmailForm = ({ handleClose, refreshItem }: { handleClose: () => void, refreshItem: () => void }) => {
    const [emailSent, setEmailSent] = React.useState<boolean>(false)
    const [selectedOption, setSelectedOption] = React.useState('Speedy');

    // Handler function for radio button changes
    const handleOptionChange = (event: any) => {
        setSelectedOption(event.target.value);
    };


    const form = React.useRef<any>()


    const { productId } = useParams()
    const item = JSON.parse(window.localStorage.getItem(productId ?? '') ?? '')
    const itemName = item.name
    const markAsOrdered = () => {
        setItemOrderStatus(productId as string, true)
    }
    const orderAlbum = () => {
        if (item.available_qty > 1) {
            sendAlbumOrder(productId as string, item.available_qty)
        } else {
            setItemOrderStatus(productId as string, true)
        }
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

        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID as string, 'template_prfqaua', form.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                if (item.is_album) {
                    orderAlbum()
                } else {
                    markAsOrdered()
                }
                sendConfirmationEmail()
                setEmailSent(true)
                refreshItem()
            }, (error) => {
                console.log(error.text);
            });

    }
    return <div className='form-wrapper'>{emailSent ? <div className="form-styler"><p>Thank you for your order! You should have received an email with your order details</p><button className="submit-button" onClick={handleClose}>Close</button></div> : <form ref={form} id="contactForm" className="form-styler" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" id="name" name="glasses" className='hidden' defaultValue={itemName} />

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="to_name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="user_email" required />

        <label htmlFor="method">Method of delivery:</label>
        <span className='delivery_method'>
            <label>
                <input
                    type="radio"
                    value="Speedy"
                    checked={selectedOption === 'Speedy'}
                    onChange={handleOptionChange}
                />
                Speedy
            </label>
            <label>
                <input
                    type="radio"
                    value="Econt"
                    checked={selectedOption === 'Econt'}
                    onChange={handleOptionChange}
                />
                Econt
            </label>
        </span>
        <input value={selectedOption} style={{ display: 'none' }} name="delivery_method" />

        <label htmlFor="address">Office Name:</label>
        <input type="text" id="address" name="address" required />

        <label htmlFor="tel">Telephone Number:</label>
        <input type="number" id="tel" name="tel" required />

        <label htmlFor="message">Message:</label>
        <label className="small-label">(not required)</label>
        <textarea id="message" name="message" ></textarea>

        <button type="submit" className="submit-button">Submit</button>
    </form>}</div >
}