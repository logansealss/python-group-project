import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import tmLogoWhite from '../../img/tm-logo-white.png';
import './navi.css';

function Navi({ loaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='main-nav-profile-btn'>
            <LogoutButton classProp='spl-sign-up-btn'/>
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
                    <img alt='' className='nav-link-home-logo'
                        src={tmLogoWhite}
                    />
                </NavLink>
            </div>
            <div className='sessionLinks-div'>
                {loaded && sessionLinks}
            </div>
            </div>
        </div>
    );
}

export default Navi;
