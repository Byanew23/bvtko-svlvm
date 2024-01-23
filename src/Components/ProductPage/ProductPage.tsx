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

    const [openModal, setOpenModal] = React.useState<boolean>(false)
    const [currentPic, setCurrentPic] = React.useState<number>(0)
    const [direction, setDirection] = React.useState<boolean>(true);

    if (!window.localStorage[productId as string] || !item) getItemById(productId || '').then(data => {
        if (!window.localStorage[data?.id as string]) {
            window.localStorage[data?.id as string] = JSON.stringify(data)
        } else if (window.localStorage[data?.id as string] !== JSON.stringify(data)) {
            window.localStorage[data?.id as string] = JSON.stringify(data)
        }
        setItem(data)
    })

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    React.useEffect(() => {

        if (item?.urls.length && item.urls.length > 1) {
            const intervalId = setInterval(() => {

                // Update the current index based on the direction
                setCurrentPic((prevIndex) => {
                    const newIndex = prevIndex + (direction ? 1 : -1);

                    // Change direction when reaching the ends of the array
                    if (newIndex >= item.urls.length - 1 || newIndex <= 0) {
                        setDirection(!direction);
                    }

                    return newIndex;
                });
            }, 180);

            return () => clearInterval(intervalId);
        }
    }, [currentPic, direction, item])

    const images = JSON.parse(window.localStorage[item?.id ?? ''] ?? '{}').urls


    return item ? <div className="product-wrapper">
        <img className="product-image" src={images[currentPic]} alt={item.name} />
        <span>

            <div className="details">
                <h2 className="name">{item.name}</h2>
                <p className="price">{item.price}</p>
                <p>{item?.description}</p>
            </div>
            <button className={`order-now${item.ordered ? "-sold" : ""}`} onClick={() => setOpenModal(true)}>{item.ordered ? "Sold Out" : "Order Now"}</button>
        </span>
        {openModal && <Modal open={openModal} onClose={() => setOpenModal(false)} component={<EmailForm handleClose={() => { setOpenModal(false); document.body.style.overflow = 'auto' }} />} />}
    </div> : <div style={{ width: '100vw', height: '100vh' }}></div>
}