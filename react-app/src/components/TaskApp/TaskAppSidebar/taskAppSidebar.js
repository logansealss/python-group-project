import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as listActions from '../../../store/lists'
import * as tagActions from '../../../store/tags'

import Collapser from './Collapser'
import BannerItem from './BannerItem'
import CreateTagListForm from '../../Forms/CreateTagListForm'
import ModalWrapper from '../../../context/Modal'

import logo from '../../../img/TM-logo-short-nobg.png'
import plus_img from '../../../img/plus.svg'
import './taskAppSidebar.css'


function Plus (props) {
  return (
    <ModalWrapper
      form={props.form}
      header={`Add a ${props.feature}`}
      feature={props.feature}
      thunk={props.thunk}
      >
      <img id='plus' src={plus_img}/>
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
    dispatch(listActions.getAllLists())
    dispatch(tagActions.getAllTags())
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
      obj: <Plus  form={<CreateTagListForm/>} feature='list' thunk={listActions.createList}/>,
      children: lists && Object.values(lists).map(list => (<BannerItem key={list.id} id={list.id}>{list.name}</BannerItem>))
    },
    'Tags': {
      expanded: tagsExpanded,
      setter: setTagsExpanded,
      title: 'Tags',
      obj: <Plus  form={<CreateTagListForm/>} feature='tag' thunk={tagActions.createTag}/>,
      children: tags && Object.values(tags).map(tag => (<BannerItem key={tag.id} id={tag.id}>{tag.name}</BannerItem>))
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
