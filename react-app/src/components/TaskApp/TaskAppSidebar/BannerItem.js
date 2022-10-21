import { useContext } from 'react';

import { DropdownProvider } from '../../../context/Dropdown';

export default function BannerItem (props) {

  return (
    <DropdownProvider position='relative'>
      <div className='banner_item' onClick={props.handleClick}>
        {props.color ? <div className='sb-tag-color' style={{backgroundColor: props.color}}></div> : null }
        <div className='title'>{props.children}</div>
        <div className='collapser_rhs_icons'>
          {props.obj}
        </div>
      </div>
    </DropdownProvider>
  )
}
