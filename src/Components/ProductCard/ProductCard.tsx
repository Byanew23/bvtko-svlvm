import React from 'react'
import './ProductCard.css'
import { glassesDataType } from '../../mockData'

export const ProductCard = ({ data }: { data: glassesDataType }) => {
    const { urls, name, price } = data
    return <div className={`image-wrapper`}>
        <img className="card-image" src={urls[0]} alt={name} />
        <div className="overlay">
            <span>Name: {name}</span>
            <span>Price: {price}</span>
        </div>
    </div>
}