import React from 'react'

import BannerItem from './BannerItem'

import downCaret from '../../../img/caret-down.svg'


export default function Collapser (props) {
  return (
    <>
    <div
      id='collapser'
      >
      <div
        id='collapse_button'
        className={props.expanded ? 'expanded' : ''}
        >
        <img className='tasb-caret' src={downCaret} />
      </div>
      {
        React.cloneElement(props.title, {
          'onClick': props.setter(val => !val)
          }
        )}
  </div>
  <div className='children_container'>
    {props.expanded && props.children}
  </div>
  </>
  )
};
