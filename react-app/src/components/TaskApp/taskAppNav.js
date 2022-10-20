import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import DropDownWrapper, { DropdownProvider } from '../../context/Dropdown'
import downCaret from '../../img/caret-down.svg'
import hamburger from '../../img/bars.svg'
import gear from '../../img/gear.svg'
import magGlass from '../../img/magnifying-glass.svg'

import * as sessionActions from '../../store/session';

import './taskAppNav.css'

export default function TaskAppNav() {

    const history = useHistory()
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');
    const [searchIconFocusStyle, setSearchIconFocusStyle] = useState('');

    function handlesearchSubmit(e) {
        e.preventDefault()
        const trimmedInput = searchInput.trim()
        if(trimmedInput !== ''){
            history.push(`/app/search/${encodeURIComponent(trimmedInput.split(' ').filter(str => str !== '').join(' '))}`)
        }
    }

    return (
        <div className='tan-main-div'>
            <img
                className='tan-hamburger-icon tan-icon-style'
                src={hamburger}
            />
            <div className='tan-search-container'>
                <div className='tan-search-pseudo-input'>
                    <img
                        className={`tan-search-mag-icon tan-search-icon-style ${searchIconFocusStyle}`}
                        src={magGlass}
                    />
                    <form onSubmit={handlesearchSubmit}>
                        <input
                            className='tan-search-input'
                            type='text'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onFocus={() => {setSearchIconFocusStyle('tan-search-icon-focus-style')}}
                            onBlur={() => {setSearchIconFocusStyle('')}}
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
                        <div
                            className='tan-dropdown-button'
                            onClick={async ()=>{
                                const response = await dispatch(sessionActions.logout())
                                if (response.ok) history.push('/')
                            }}
                            >Logout
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
