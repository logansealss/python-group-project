import downCaret from '../../../img/caret-down.svg'
import DropDownWrapper from '../../DropdownWrapper'


export default function BannerItem (props) {

  return (
    <>
    <div id='banner_item'>
      <div className='title'>{props.children}</div>
        <div className='collapser_rhs_icons'>
          <DropDownWrapper
            offset='14px'
            left={true}
            menu={<div className='dropdown_menu'>My new menu</div>}
            >
            <img id='dropdown_caret' className='tasb-caret' src={downCaret} />
          </DropDownWrapper>
          {props.obj}

      </div>
    </div>
    </>
  )
}
