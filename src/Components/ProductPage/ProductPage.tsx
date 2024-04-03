import React from 'react'
import { useParams } from 'react-router-dom';
import './ProductPage.css'
import cacheImages from '../../hooks/cacheImages';
import { changeItemWishlist } from '../../hooks/useSupabaseData';
import { glassesDataType } from '../../utils';
import { Modal } from '../Modal';
import { EmailForm } from './EmailForm';

export const ProductPage = () => {
    const { productId } = useParams();
    const [item, setItem] = React.useState<glassesDataType | undefined>(undefined)
    const [isInWishlist, setIsInWishlist] = React.useState<boolean>(false)

    const [openModal, setOpenModal] = React.useState<boolean>(false)
    const [currentPic, setCurrentPic] = React.useState<number>(0)
    const [direction, setDirection] = React.useState<boolean>(true);

    if (!item) {
        setItem(JSON.parse(window.localStorage[productId ?? '']))
    } else {
        cacheImages(item.urls)
    }

    React.useEffect(() => {
        if (item) {
            const wishlist = window.localStorage.getItem('wishlist')?.split(',')
            if (wishlist?.includes(item.id + '')) setIsInWishlist(true)
        }
    }, [])

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

    const handleAddToWishlist = (item: glassesDataType, add: boolean) => {

        let wishlist = window.localStorage.getItem('wishlist')
        let currItem = JSON.parse(window.localStorage.getItem(item.id) ?? '')
        if (add) {
            // Add the item id to wishlist
            if (!wishlist) {
                window.localStorage.setItem('wishlist', item.id)
            } else {
                wishlist = wishlist + ',' + item.id
                window.localStorage.setItem('wishlist', wishlist)
            }

            if (currItem) {
                currItem.in_wishlist = parseInt(currItem.in_wishlist) + 1
                window.localStorage.setItem(item.id, JSON.stringify(currItem))
            }
        } else {
            // Remove item id from wishlist
            let wishlistItems = wishlist?.split(',')
            wishlistItems = wishlistItems?.filter(x => x != item.id)

            window.localStorage.setItem('wishlist', wishlistItems?.join(',') ?? '')

            if (currItem) {
                currItem.in_wishlist = parseInt(currItem.in_wishlist) - 1
                window.localStorage.setItem(item.id, JSON.stringify(currItem))
            }
        }

        changeItemWishlist(item.id, currItem.in_wishlist)
        setIsInWishlist(add)
    }

    const images = JSON.parse(window.localStorage[item?.id ?? ''] ?? '{}').urls

    const handleRefreshOrderedItem = () => {
        let currItem = JSON.parse(window.localStorage.getItem(productId ?? '') ?? '')
        currItem.ordered = true
        setItem(currItem)
    }


    return item ? <div className="product-wrapper">
        <img className="product-image" src={images[currentPic]} alt={item.name} />
        <span>

            <div className="details">
                <h2 className="name">{item.name}</h2>
                <p className="price">Price: {item.price} BGN</p>
                <p>{item?.description}</p>
            </div>
            <span className='CTAs'>
                <button className={`order-now${item.ordered ? "-sold" : ""}`} onClick={() => setOpenModal(true)}>{item.ordered ? "Sold Out" : "Order Now"}</button>
                {item.ordered && <button className={`order-now ${isInWishlist && 'in-wishlist'}`} onClick={() => handleAddToWishlist(item, !isInWishlist)}>{isInWishlist ? "Remove From Wishlist" : "Add To Wishlist"}</button>}
            </span>
            <span >
                <p className='disclaimer'>Disclaimer: This is an Art Piece and is not design to protect your eyes from the sun! </p>
            </span>
        </span>
        {openModal && <Modal open={openModal} onClose={() => setOpenModal(false)} component={<EmailForm handleClose={() => { setOpenModal(false); document.body.style.overflow = 'auto' }} refreshItem={() => handleRefreshOrderedItem()} />} />}
    </div> : <div style={{ width: '100vw', height: '100vh' }}></div>
}