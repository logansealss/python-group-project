import { useContext } from 'react';

import { SidebarContext } from '../../../context/Sidebar';
import { DropdownProvider } from '../../../context/Dropdown';

export default function BannerItem (props) {
  const {listName} = useContext(SidebarContext)
  const [currentListName, _setListName] = listName

  return (
    <DropdownProvider position='relative'>
      <div className='banner_item' onClick={props.handleClick}>
        {props.color ? <div className='sb-tag-color' style={{backgroundColor: props.color}}></div> : null }
        <div className={`title ${currentListName === props.children ? 'bold' :''}`}>{props.children}</div>
        <div className='collapser_rhs_icons'>
          {props.obj}
        </div>
      </div>
    </DropdownProvider>
  )
}
