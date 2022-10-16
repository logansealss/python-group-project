import React, { useState } from 'react'

import Collapser from './Collapser'

import logo from '../../../img/TM-logo-short-nobg.png'
import plus_img from '../../../img/plus.svg'
import './taskAppSidebar.css'


function Plus () {
  return (<img src={plus_img} className='plus_button'/>)
};

function Count (props) {
  return (<div>{props.count}</div>)
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
