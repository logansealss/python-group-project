import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import steveShop from '../../img/hp_steve_3.png';
import './splash.css';


export default function Splash() {
    let user = useSelector((state) => state.session.user);

    return (
        <div className='main-body'>
            <div className='splash-upper'>
                The smart to-do app for busy people.
            </div>
            <div className='mid-btn-div'>
                <button className='main-body-sign-up-btn'> Sign Up Free</button>
            </div>
            <div className='spl-lower-main'>
                <img className='spl-steve-img-1' src={steveShop} />
                <div className='spl-lower-title-text'>Get things done, together.</div>
                <p className='spl-lower-p'>
                    Share your lists and give tasks to
                    {' '}others to get things done faster.</p>
            </div>
            <div className='spl-bottom-padding-div'></div>
        </div>
    )
}
