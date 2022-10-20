import React from 'react'

import downCaret from '../../../img/caret-down.svg';


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
          onClick={()=>props.expander(val=>!val)}>
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
