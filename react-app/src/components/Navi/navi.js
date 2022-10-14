import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileBtn from './profileBtn';
// import LoginFormModal from '../LoginFormModal';
import tmLogoWhite from '../../img/tm-logo-white.png';
import './navi.css';

function Navi({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='main-nav-profile-btn'>
            <ProfileBtn user={sessionUser} />
            </div>
        );
    } else {
        sessionLinks = (
            <div className='main-nav-profile-btn'>
                {/* <LoginFormModal /> */}
                <Link className='main-nav-link-text' to="/login">Log in</Link>
                <Link className='main-nav-btn-link-wrap' to="/signup">
                    <button className='spl-sign-up-btn' >Sign up for free</button>
                </Link>
            </div>
        );
    }

    return (
        <div className='main-nav-top'>
            <div className='main-nav-top-content'>
            <div className='home-link-div'>
                <NavLink exact to="/">
                    <img className='nav-link-home-logo'
                        src={tmLogoWhite}
                    />
                </NavLink>
            </div>
            <div className='sessionLinks-div'>
                {isLoaded && sessionLinks}
            </div>
            </div>
        </div>
    );
}

export default Navi;
