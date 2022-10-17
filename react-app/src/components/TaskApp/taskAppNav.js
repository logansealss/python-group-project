import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'

import DropDownWrapper from '../DropdownWrapper'
import downCaret from '../../img/caret-down.svg'
import hamburger from '../../img/bars.svg'
import gear from '../../img/gear.svg'
import magGlass from '../../img/magnifying-glass.svg'

import './taskAppNav.css'

export default function TaskAppNav() {

    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');
    const [searchIconFocusStyle, setSearchIconFocusStyle] = useState('');

    function handlesearchSubmit(e) {
        e.preventDefault()
        console.log('search submit!');
    }

    return (
        <div className='tan-main-div'>

            <img
                className='tan-hamburger-icon tan-icon-style'
                src={hamburger}
            />
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
            <DropDownWrapper offset='35px'>
                <img
                    className={`tan-search-down-caret-icon tan-search-icon-style ${searchIconFocusStyle}`}
                    src={downCaret}
                />
            </DropDownWrapper>
            </div>
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
        </div>
    )
}
