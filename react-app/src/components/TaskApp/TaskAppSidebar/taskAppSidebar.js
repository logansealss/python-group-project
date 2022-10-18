import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Collapser from './Collapser'
import BannerItem from './BannerItem'
import { getAllLists } from '../../../store/lists'

import logo from '../../../img/TM-logo-short-nobg.png'
import plus_img from '../../../img/plus.svg'
import './taskAppSidebar.css'
import ModalWrapper from '../../../context/Modal'
import { getAllTags } from '../../../store/tags'
import { createNewTask } from '../../../store/tasks'


function Plus() {
  return (
    <ModalWrapper form={<div>New Modal</div>}>
      <img id='plus' src={plus_img} />
    </ModalWrapper>
  )
};

function Count(props) {
  return (<div id='count'>{props.count}</div>)
};

export default function TaskAppSidebar() {
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.allTasks)
  const lists = useSelector(state => state.lists)
  const tags = useSelector(state => state.tags)

  const [allTasksExpanded, setAllTasksExpanded] = useState(false)
  const [listsExpanded, setListsExpanded] = useState(false)
  const [tagsExpanded, setTagsExpanded] = useState(false)

  useEffect(() => {
    dispatch(getAllLists())
    dispatch(getAllTags())
  }, [dispatch])

  const items = {
    'Tasks': {
      expanded: allTasksExpanded,
      setter: setAllTasksExpanded,
      title: 'Tasks',
      children: ['All Tasks', 'Today', 'Tomorrow'].map(title => (
        <BannerItem key={title} obj={<Count count={14} />}>{title}</BannerItem>
      ))
    },
    'Lists': {
      expanded: listsExpanded,
      setter: setListsExpanded,
      title: 'Lists',
      obj: <Plus />,
      children: Object.values(lists).map(list => (<BannerItem key={list.id}>{list.name}</BannerItem>))
    },
    'Tags': {
      expanded: tagsExpanded,
      setter: setTagsExpanded,
      title: 'Tags',
      obj: <Plus />,
      children: Object.values(tags).map(tag => (<BannerItem key={tag.id}>{tag.name}</BannerItem>))
    },
  };

  return (
    <div id='sidebar'>
      <div className='logo_container'>
        <img className='tasb-top-logo' src={logo} />
      </div>
      {Object.keys(items).map(itemName => (
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
