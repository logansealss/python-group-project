import React from 'react'

import DropDownWrapper from '../../DropdownWrapper'
import downCaret from '../../../img/caret-down.svg'


export default function Collapser (props) {
  return (
    <div
      id='collapser'
      >
      <div
        id='collapser_header'
        >
        <div
          id='collapser_action'
          onClick={()=>props.setter(val=>!val)}>
          <div
            id='collapse_button'
            className={props.expanded ? 'expanded' : ''}
            >
              <img className='tasb-caret' src={downCaret} />
          </div>
          <div className='title'>
            {props.title}
          </div>
        </div>
        <div className='collapser_rhs_icons'>
          {/* <DropDownWrapper
            offset='14px'
            menu={<div className='dropdown_menu'>My new menu</div>}
            >
            <img id= 'dropdown_caret' className='tasb-caret' src={downCaret} />
          </DropDownWrapper> */}
          {props.obj}
          </div>
        </div>
      <div id='children_container'>
        {props.expanded && props.children}
      </div>
    </div>
  )
};


<>

</>
