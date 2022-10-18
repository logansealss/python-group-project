import React, { useEffect, useState } from 'react'
import './dropdown.css'

export default function DropDownWrapper(props) {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = (e) => {
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
        'style': {
          'cursor': 'pointer'}
      }
      )}

    {showMenu && (
    <div
        className={`dropdown_container ${props.left ? 'left' : 'right'}`}
        style={{'top': props.offset}}
        >
        {React.cloneElement(props.menu,
          // {onClick: (e)=>e.stopPropagation()}
          )}
      </div>
    )
    }

    </>
  );
};
