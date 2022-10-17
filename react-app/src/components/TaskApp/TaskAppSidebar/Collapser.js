import React from 'react'

import downCaret from '../../../img/caret-down.svg'


export default function Collapser (props) {
  return (
    <div
      id='collapser'
      >
      <div
        id='collapser_header'
        onClick={()=>props.setter(val=>!val)}
        >
        <div
          id='collapse_button'
          className={props.expanded ? 'expanded' : ''}
          >
          <img className='tasb-caret' src={downCaret} />
        </div>
        {props.title}
      </div>
    <div id='children_container'>
      {props.expanded && props.children}
    </div>
    </div>
  )
};
