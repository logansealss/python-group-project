import React, { useState } from 'react'

import logo from '../../../img/TM-logo-short-nobg.png'
import downCaret from '../../../img/caret-down.svg'
import './taskAppSidebar.css'


function Collapser (props) {
  return (
    <div id='collapser'>
      <div
        id='collapse_button'
        className={props.expanded && 'expanded'}
        onClick={()=> props.setter(val => !val)}>
        <img className='tasb-caret' src={downCaret} />
      </div>
      <div className='grow'>{props.title}</div>
      <div className='flex'>
        {props.obj}
        <div><img className='tasb-caret' src={downCaret} /></div>
      </div>
      {props.expanded && props.children}
  </div>
  )
};

export default function TaskAppSidebar () {
  const [allTasksExpanded, setAllTasksExpanded ] = useState(true)
  const [listsExpanded, setListsExpanded ] = useState(false)
  const [tagsExpanded, setTagsExpanded ] = useState(false)

const items = {
  'All Tasks': {
    obj: <Count count={3}/>,
    expanded: allTasksExpanded,
    setter: setAllTasksExpanded,
    children:[]
  },
  'Lists':{
    obj: <Plus/>,
    expanded: listsExpanded,
    setter: setListsExpanded,
    children:[]
  },
  'Tags': {
    obj: <Plus/>,
    expanded: tagsExpanded,
    setter: setTagsExpanded,
    children:[]
  },
};

return  (
  <div id='sidebar'>
  <img className='tasb-top-logo' src={logo} />
  {Object.keys(items).map(itemName=> (
    <Collapser
      title={itemName}
      expanded={items[itemName]['expanded']}
      setter={items[itemName]['setter']}
      obj={items[itemName]['obj']}
      >


    </Collapser>
    ))}
  </div>
  )
};


function Plus () {
  return (<div><i className="fa-solid fa-plus"></i></div>)
};

function Count (props) {
  return (<div>{props.count}</div>)
};
