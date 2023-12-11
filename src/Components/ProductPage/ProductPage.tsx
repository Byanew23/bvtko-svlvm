import React from 'react'
import { useParams } from 'react-router-dom';
import { glassesData } from '../../mockData';
import './ProductPage.css'

export const ProductPage = () => {
    const { productId } = useParams();

    // Fetch product details based on productId or use static data
    const productDetails = glassesData.find(item => item.id === productId);

    console.log(productDetails)

    return productDetails ? <div className="product-wrapper">
        <img className="product-image" src={productDetails.url} alt={productDetails.alt} />
        <div className="details">
            <h2 className="name">{productDetails.alt}</h2>
            <p className="price">{productDetails.price}</p>
            Add other product details and styling
        </div>
    </div> : null
}