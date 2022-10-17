import downCaret from '../../../img/caret-down.svg'
import DropDownWrapper from '../../DropdownWrapper'


export default function BannerItem (props) {

  return (
    <>
    <div id='banner_item'>
      <div className='grow'>{props.children}</div>
        <div className='collapser_rhs_icons'>
            {props.obj}
          <DropDownWrapper
            offset='0px'
            menu={<div className='dropdown_menu'>My new menu</div>}
            >
            <img className='tasb-caret' src={downCaret} />
          </DropDownWrapper>

      </div>
    </div>
    </>
  )
}
