import React from 'react'
import { useParams } from 'react-router-dom';
import './ProductPage.css'
import { getItemById } from '../../hooks/useSupabaseData';
import { glassesDataType } from '../../mockData';
import { Modal } from '../Modal';
import { EmailForm } from './EmailForm';

export const ProductPage = () => {
    const { productId } = useParams();
    const [item, setItem] = React.useState<glassesDataType | undefined>(undefined)
    window.scrollTo(0, 0)
    const [openModal, setOpenModal] = React.useState<boolean>(false)

    // Fetch product details based on productId or use static data
    if (!item) getItemById(productId || '').then(data => setItem(data))

    console.log(openModal)

    return item ? <div className="product-wrapper">
        <img className="product-image" src={item.urls[0]} alt={item.name} />
        <div className="details">
            <h2 className="name">{item.name}</h2>
            <p className="price">{item.price}</p>
            Add other product details and styling
        </div>
        <button className="order-now" onClick={() => setOpenModal(true)}>Order Now</button>
        {openModal && <Modal open={openModal} onClose={() => setOpenModal(false)} component={<EmailForm handleClose={() => { setOpenModal(false); document.body.style.overflow = 'auto' }} />} />}
    </div> : <div style={{ width: '100vw', height: '100vh', background: "#595858" }}></div>
}