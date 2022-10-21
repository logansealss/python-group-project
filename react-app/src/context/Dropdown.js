import React, { useEffect, useRef, useState, useContext } from "react";
import ReactDom from 'react-dom';

import './Dropdown.css'

const DropdownContext = React.createContext();
const GlobalDropDownContext = React.createContext();

export function AllDropDownsProvider(props) {
  const [anyDropDownsOpen, setAnyDropDownsOpen] = useState(null);
  return (
    <GlobalDropDownContext.Provider value={[anyDropDownsOpen, setAnyDropDownsOpen]}>
      {props.children}
    </GlobalDropDownContext.Provider>
  )
};

export function DropdownProvider(props) {

  const dropdownRef = useRef();
  const [location, setLocation] = useState();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(()=> {
    setLocation(dropdownRef.current);
  }, []);

  return (
    <>
      <DropdownContext.Provider value={{location,showMenu,setShowMenu}}>
        {props.children}
      </DropdownContext.Provider>
      <div
        ref={dropdownRef}
        className={`dropdown_container ${showMenu ? '' : 'hidden'} ${props.left ? 'left' : 'right'} ${props.position}`}
        style={{'top': props.offset}}
        >
      </div>
    </>
  )
}

export default function DropDownWrapper(props) {
  const {showMenu, setShowMenu} = useContext(DropdownContext)
  const [anyDropDownsOpen, setAnyDropDownsOpen] = useContext(GlobalDropDownContext)

  const closeMenu = () => {
    // console.log('closing menu')
    setShowMenu(false);
    // console.log('setting global dropdowns to closed')
    setAnyDropDownsOpen(null)
  };

  const openMenu = (e) => {
    e.stopPropagation();
    // console.log('in open menu')
    if (anyDropDownsOpen) {
      // console.log('another dropdown is open')
      anyDropDownsOpen()
    };
    // console.log('opening menu')
    setShowMenu(true);
    setAnyDropDownsOpen((val)=>closeMenu)
    // console.log('adding to global dropdown context')
  };


  useEffect(() => {
    if (!showMenu) return;
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

  return (
    <>
      {React.cloneElement(
        props.children,
        {
          'onClick': openMenu,
          'style': {
            'cursor': 'pointer'
          }
        }
        )}
      {<Dropdown {...props}/>}
    </>
  );
};

export function Dropdown (props) {
  const {children, menu, ...otherProps} = props
  const {location} = useContext(DropdownContext)
  const newMenu = React.cloneElement(menu, otherProps)
  if (!location) return null
  return ReactDom.createPortal(newMenu, location);
};
