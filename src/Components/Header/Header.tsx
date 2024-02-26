import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
    const navigate = useNavigate()
    return <div className="title">
        <span className="title-text" onClick={() => navigate('/')}>
            <img src='svlvmv-logo-inv.png' className='header-logo' />
        </span>
    </div>
}