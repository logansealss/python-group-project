import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import './dropdown.css'

export default function DropDownWrapper(props) {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
    {React.cloneElement(
      props.children,
      {
        'onClick': openMenu,
        'style': {'cursor': 'pointer'}
      }
      )}

    {showMenu && props.location && ReactDom.createPortal(
      <div
        className='dropdown_container'
        style={{'top': props.offset}}
        >
        {props.menu}
      </div>,
      props.location
      )}
    </>
  );
};
