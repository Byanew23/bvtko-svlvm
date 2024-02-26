import React from 'react'
import './ProductCard.css'
import { glassesDataType } from '../../utils'

export const ProductCard = ({ data }: { data: glassesDataType }) => {
    const { urls, name, price, ordered } = data
    return <div className={`image-wrapper`}>
        <div className={`sold-overlay${ordered ? "-true" : ""}`} />
        <img className="card-image" src={urls[0]} alt={name} />
    </div>
}