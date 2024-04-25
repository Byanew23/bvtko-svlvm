import React from 'react'
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

export const Footer = () => {
    const iconStyles = {
        width: '50px',
        height: '50px',
        color: 'white'
    }
    return <div className='footer-wrapper'>
        <Link to={'https://instagram.com/bvtko_svlvm'} target='new'><FontAwesomeIcon icon={faInstagram} style={iconStyles} /></Link>
        <Link to={'https://www.youtube.com/@BVTKO_SVLVM'} target='new'><FontAwesomeIcon icon={faYoutube} style={iconStyles} /></Link>
    </div>
}