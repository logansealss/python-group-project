import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

import * as taskActions from '../../../store/tasks';
import * as listActions from '../../../store/lists';
import * as tagActions from '../../../store/tags';

import Collapser from './Collapser';
import BannerItem from './BannerItem';
import CreateTagListForm from './Forms/CreateTagListForm';
import ModalWrapper from '../../../context/Modal';
import { getDateFromToday } from '../../../utils/taskLists';

import logo from '../../../img/TM-logo-short-nobg.png';
import plus_img from '../../../img/plus.svg';
import './taskAppSidebar.css';


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

function getCount (tasks, targetFeature, targetValue) {
  switch (targetFeature) {
    case 'dueDate':
      if (!targetValue) {
        return Object.values(tasks)
        .reduce((count,task)=>{
          if (!task['completed']) count++;
          return count
        },0);
      } else {
        return Object.values(tasks)
        .reduce((count,task)=>{
          if (
            task[targetFeature]?.slice(0, 10) >= getDateFromToday()
            && task[targetFeature]?.slice(0, 10) <= targetValue
            && !task['completed']
            ) count++;
        return count
        },0);
      };
    case 'listId':
      return Object.values(tasks)
        .reduce((count,task)=>{
        if (task[targetFeature] === targetValue && !task['completed']) count++;
        return count
      },0);
    case 'tags':
      return Object.values(tasks)
        .reduce((count,task)=>{
        if (task[targetFeature].includes(targetValue) && !task['completed']) count++;
        return count
      },0)
  }
}

export default function TaskAppSidebar() {
  const dispatch = useDispatch()
  const history = useHistory();
  const tasks = useSelector(state => state.tasks.allTasks)
  const lists = useSelector(state => state.lists)
  const tags = useSelector(state => state.tags)

  const [allTasksExpanded, setAllTasksExpanded] = useState(false)
  const [listsExpanded, setListsExpanded] = useState(false)
  const [tagsExpanded, setTagsExpanded] = useState(false)

  useEffect(() => {
    dispatch(taskActions.getAllTasks())
    dispatch(listActions.getAllLists())
    dispatch(tagActions.getAllTags())
  }, [dispatch])

  if (!tasks) return null

  const items = {
    'Tasks': {
      expanded: allTasksExpanded,
      setter: setAllTasksExpanded,
      title: 'Tasks',
      children: [['All Tasks', 'all'], ['Today', 'today', getDateFromToday()], ['Tomorrow', 'tomorrow', getDateFromToday(1)], ['This Week', 'week', getDateFromToday(6)]]
        .map(([title, slug, endDate]) => (
          <BannerItem
            key={title}
            obj={<Count count={getCount(tasks, 'dueDate', endDate)}/>}
            handleClick={()=>history.push(`/app/lists/${slug}`)}
            >
            {title}
          </BannerItem>
      ))
    },
    'Lists': {
      expanded: listsExpanded,
      setter: setListsExpanded,
      title: 'Lists',
      obj: <Plus  form={<CreateTagListForm/>} feature='list' thunk={listActions.createList}/>,
      children: lists && Object.values(lists)
        .map(list => (
          <BannerItem
            key={list.id}
            itemId={list.id}
            name={list.name}
            feature='list'
            obj={<Count count={getCount(tasks, 'listId', list.id)}/>}
            handleClick={()=>history.push(`/app/lists/${list.id}`)}
            >
            {list.name}
          </BannerItem>
      ))
    },
    'Tags': {
      expanded: tagsExpanded,
      setter: setTagsExpanded,
      title: 'Tags',
      obj: <Plus  form={<CreateTagListForm/>} feature='tag' thunk={tagActions.createTag}/>,
      children: tags && Object.values(tags).map(tag => (
        <BannerItem
          key={tag.id}
          itemId={tag.id}
          name={tag.name}
          feature='tag'
          obj={<Count count={getCount(tasks, 'tags', tag.id)}/>}
          handleClick={()=>history.push(`/app/tags/${tag.id}`)}
          >
          {tag.name}
        </BannerItem>))
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
