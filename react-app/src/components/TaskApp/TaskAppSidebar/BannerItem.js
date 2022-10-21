import { DropdownProvider } from '../../../context/Dropdown';


export default function BannerItem (props) {

    console.log('props=====', props)


  return (
    <DropdownProvider position='relative'>
      <div id='banner_item'>
        {props.color ? <div className='sb-tag-color' style={{backgroundColor: props.color}}></div> : null }
        <div className='title' onClick={props.handleClick}>{props.children}</div>
        <div className='collapser_rhs_icons'>
          {props.obj}
        </div>
      </div>
    </DropdownProvider>
  )
}
