import { DropdownProvider } from '../../../context/Dropdown';


export default function BannerItem (props) {

  return (
    <DropdownProvider position='relative'>
      <div className='banner_item'>
        <div className='title' onClick={props.handleClick}>{props.children}</div>
        <div className='collapser_rhs_icons'>
          {props.obj}
        </div>
      </div>
    </DropdownProvider>
  )
}
