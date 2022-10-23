import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import DropDownWrapper, { DropdownProvider } from '../../context/Dropdown';
import downCaret from '../../img/caret-down.svg';
import hamburger from '../../img/bars.svg';
import gear from '../../img/gear.svg';
import magGlass from '../../img/magnifying-glass.svg';
import profilePic from '../../img/TM-small-logo.png';
import { SidebarContext } from '../../context/Sidebar';
import * as sessionActions from '../../store/session';

import './taskAppNav.css'

export default function TaskAppNav() {

    const history = useHistory()
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [searchInput, setSearchInput] = useState('');
    const [searchIconFocusStyle, setSearchIconFocusStyle] = useState('');
    const { expander, listName } = useContext(SidebarContext);
    const [expandSideBar, setExpandSideBar] = expander;
    const [currentListName, setListName] = listName;

    function runSearch(searchInput) {
        const trimmedInput = searchInput.trim()
        const searchInputDOMNode = document.getElementById('search-input-field')
        if (searchInputDOMNode.matches(':focus')) {
            if (!searchInput) {
                history.push('/app')
            } else {
                history.push(`/app/search/${encodeURIComponent(trimmedInput.split(' ')
                .filter(str => str !== '').join(' '))}`);
            }
        };
    };

    function handleSubmit(e) {
        e.preventDefault()
    };

    useEffect(() => {
        runSearch(searchInput)
    }, [searchInput])

    return (
        <div className='tan-main-div'>
            <div className='tan-left-container'>
                <div
                    className='tan-left-div'
                    onClick={() => setExpandSideBar(val => !val)}
                >
                    <img
                        className='tan-hamburger-icon tan-icon-style'
                        src={hamburger}
                    />
                    <div
                        className={`tan-list-name`}
                        id={`${expandSideBar ? 'no-width' : ''}`}>
                        {currentListName}
                    </div>
                </div>
                <div className={`${expandSideBar ? 'expandDiv' : 'shrink'}`}></div>
            </div>
            <div className='tan-search-container'>
                <div className='tan-search-pseudo-input'>
                    <img
                        className={`tan-search-mag-icon tan-search-icon-style ${searchIconFocusStyle}`}
                        src={magGlass}
                    />
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        history.push()
                        document.getElementById('search-input-field').blur();
                    }}>
                        <input
                            className='tan-search-input'
                            id='search-input-field'
                            type='text'
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value)
                            }}
                            onFocus={() => { setSearchIconFocusStyle('tan-search-icon-focus-style') }}
                            onBlur={() => { setSearchIconFocusStyle('') }}
                        />
                    </form>
                    {/* <img
                        className={`tan-search-down-caret-icon tan-search-icon-style ${searchIconFocusStyle}`}
                        src={downCaret}
                    /> */}
                </div>
            </div>
            <DropdownProvider position='relative'>
                <DropDownWrapper menu={
                    <div className='tan-settings-dropdown-menu'>
                        <div id="dropdown-profile">
                            <div id="dropdown-profile-pic">
                                <img src={profilePic} />
                            </div>
                            <div id="dropdown-profile-info">
                                <div>
                                    <strong>
                                        {`${user.first_name} ${user.last_name}`}
                                    </strong>
                                </div>
                                <div>
                                    {`${user.email}`}
                                </div>
                            </div>
                        </div>
                        <div
                            className='tan-dropdown-button'
                            id="dropdown-profile-signout"
                            onClick={async () => {
                                const response = await dispatch(sessionActions.logout())
                                if (response.ok) history.push('/')
                            }}
                        >Sign out
                        </div>
                    </div>
                }>
                    <div className='tan-settings-icon-grp'>
                        <img
                            className='tan-settings-gear-icon tan-icon-style'
                            src={gear}
                        />
                        <img
                            className='tan-settings-down-caret-icon tan-icon-style'
                            src={downCaret}
                        />
                    </div>
                </DropDownWrapper>
            </DropdownProvider>
        </div>
    )
}
