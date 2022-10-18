import React, { useEffect, useRef, useState, useContext } from "react";
import ReactDom from 'react-dom';

import './Dropdown.css'

const DropdownContext = React.createContext();

export function DropdownProvider(props) {
  const dropdownRef = useRef();
  const [location, setLocation] = useState();

  useEffect(()=> {
    setLocation(dropdownRef.current);
  }, []);

  return (
    <>
      <DropdownContext.Provider value={location}>
        {props.children}
      </DropdownContext.Provider>
      <div
        ref={dropdownRef}
        className={`dropdown_container ${props.left ? 'left' : 'right'}`}
        style={{'top': props.offset}}
        >
      </div>
    </>
  )
}

export default function DropDownWrapper(props) {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = (e) => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
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
      {showMenu && <Dropdown {...props}/>}
    </>
  );
};

export function Dropdown (props) {
  const location = useContext(DropdownContext)
  if (!location) return props.menu
  return ReactDom.createPortal(props.menu, location);
};
