import React from 'react'
import './LandingPage.css'
import { ProductCard } from '../ProductCard'
import { Link } from 'react-router-dom'
import { glassesData } from '../../mockData'


export const LandingPage = () => {

    return <div className="wrapper">

        <div className='images-wrapper'>{glassesData.map(item => {
            return <Link to={`/${item.id}`}><ProductCard data={item} /></Link>
        })}</div>
    </div>
}