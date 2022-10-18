import React, { useState } from 'react'

import Collapser from './Collapser'
import BannerItem from './BannerItem'

import logo from '../../../img/TM-logo-short-nobg.png'
import plus_img from '../../../img/plus.svg'
import './taskAppSidebar.css'
import ModalWrapper from '../../../context/Modal'


function Plus () {
  return (
    <ModalWrapper form={<div>New Modal</div>}>
      <img id='plus' src={plus_img}/>
    </ModalWrapper>
  )
};

function Count (props) {
  return (<div id='count'>{props.count}</div>)
};

export default function TaskAppSidebar () {
  const [allTasksExpanded, setAllTasksExpanded ] = useState(false)
  const [listsExpanded, setListsExpanded ] = useState(false)
  const [tagsExpanded, setTagsExpanded ] = useState(false)

const items = {
  'Tasks': {
    expanded: allTasksExpanded,
    setter: setAllTasksExpanded,
    title: 'Tasks',
    children: ['All Tasks', 'Today', 'Tomorrow'].map(title=> (
      <BannerItem key={title} obj={<Count count={14}/>}>{title}</BannerItem>
    ))
  },
  'Lists':{
    expanded: listsExpanded,
    setter: setListsExpanded,
    title: 'Lists',
    obj: <Plus/>,
    children:[]
  },
  'Tags': {
    expanded: tagsExpanded,
    setter: setTagsExpanded,
    title: 'Tags',
    obj: <Plus/>,
    children:[]
  },
};

return  (
  <div id='sidebar'>
    <div className='logo_container'>
      <img className='tasb-top-logo' src={logo}/>
    </div>
  {Object.keys(items).map(itemName=> (
    <Collapser
      key={itemName}
      title={items[itemName]['title']}
      expanded={items[itemName]['expanded']}
      setter={items[itemName]['setter']}
      obj={items[itemName]['obj']}
      >
        {items[itemName]['children']}
    </Collapser>
    ))}
  </div>
  )
};
