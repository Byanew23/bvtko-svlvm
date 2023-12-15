import React from 'react'
import './LandingPage.css'
import { ProductCard } from '../ProductCard'
import { Link } from 'react-router-dom'
import { getItems } from '../../hooks/useSupabaseData'


export const LandingPage = () => {
    const [images, setImages] = React.useState<any[] | undefined>()
    if (!images) {

        getItems().then(d => setImages(d))
    }

    return <div className="wrapper">
        <div className='images-wrapper'>{images?.map(item => {
            return <Link to={`/${item.id}`} key={`${item.id}`}><ProductCard data={item} /></Link>
        })}</div>
    </div>
}