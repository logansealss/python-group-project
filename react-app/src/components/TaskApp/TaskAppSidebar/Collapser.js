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
          <div id='banner_item'>
            <div className='grow'>
              {props.title}
            </div>
          </div>
        </div>
        <div className='collapser_rhs_icons'>
          {props.obj}
          <DropDownWrapper
            offset='10px'
            menu={<div className='dropdown_menu'>My new menu</div>}
            >
            <img className='tasb-caret' src={downCaret} />
          </DropDownWrapper>
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
