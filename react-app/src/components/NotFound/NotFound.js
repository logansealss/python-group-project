import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../img/TM-LOGO-404.png';
import './notFound.css';

export default function NotFound() {
    return (
        <div className='nf-main-div'>
            <img
                className='nf-logo'
                src={logo}
            />
            <div className='nf-btns'>
                <Link to='/'>
                    <button className='nf-nav-btn'>
                        Home
                    </button>
                </Link>
                <Link to='/app/tasks/all'>
                    <button className='nf-nav-btn'>
                        App
                    </button>
                </Link>
            </div>
        </div>
    )
}
