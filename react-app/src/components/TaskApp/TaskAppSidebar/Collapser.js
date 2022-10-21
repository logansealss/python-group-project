import React from 'react'

import downCaret from '../../../img/caret-down.svg';

export default function Collapser (props) {
  return (
    <div
      className='collapser'
      >
      <div
        className='collapser_header'
        >
        <div
          className='collapser_action'
          onClick={()=>props.expander(val=>!val)}>
          <div
            className='collapse_button'
            id={props.expanded ? 'expanded' : ''}
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
      <div className='children_container'>
        {props.expanded && props.children}
      </div>
    </div>
  )
};
