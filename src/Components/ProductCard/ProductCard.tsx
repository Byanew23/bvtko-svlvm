import React from 'react'
import './ProductCard.css'

interface ProductCardType {
    id: string
    url: string
    alt: string
    isBig?: boolean
    price: string
}

export const ProductCard = ({ data }: { data: ProductCardType }) => {
    const { url, alt, price, id } = data
    return <div className={`image-wrapper`}>
        <img className="card-image" src={url} alt={alt} />
        <div className="overlay">
            <span>Name: {alt}</span>
            <span>Price: {price}</span>
        </div>
    </div>
}