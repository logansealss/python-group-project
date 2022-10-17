import { useRef, useState, useEffect } from 'react'
import ModalWrapper from '../../../context/Modal'
import downCaret from '../../../img/caret-down.svg'
import DropDownWrapper from '../../DropdownWrapper'


export default function BannerItem (props) {
  const ref = useRef()
  const [dropdownLocation, setDropdownLocation] = useState()
  useEffect(()=> {
    setDropdownLocation(ref.current);
  }, []);

  return (
    <>
    <div id='banner_item'>
      <div className='grow'>{props.children}</div>
        <div className='collapser_rhs_icons'>
          {props.obj}
          <DropDownWrapper
            offset='0px'
            location={dropdownLocation}
            menu={<div className='dropdown_menu'>My new menu</div>}
            >
            <img className='tasb-caret' src={downCaret} />
          </DropDownWrapper>

      </div>
    </div>
    <div ref={ref}></div>
    </>
  )
}
