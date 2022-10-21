import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';

import * as taskActions from '../../../store/tasks';
import * as listActions from '../../../store/lists';
import * as tagActions from '../../../store/tags';

import Collapser from './Collapser';
import BannerItem from './BannerItem';
import {Plus, Count, DownCaret} from './Icons';
import CreateTagListForm from './Forms/CreateTagListForm';
import { getDateFromToday } from '../../../utils/taskLists';
import { SidebarContext } from '../../../context/Sidebar';
import logo from '../../../img/TM-logo-short-nobg.png';

import './taskAppSidebar.css';

function getCount (tasks, targetFeature, targetValue) {
  switch (targetFeature) {
    case 'tasks':
      switch (targetValue) {
        case 'incomplete':
          return Object.values(tasks)
            .reduce((count,task)=>{
              if (!task['completed']) count++;
              return count
            },0);
        case 'completed':
          return Object.values(tasks)
            .reduce((count,task)=>{
              if (task['completed']) count++;
              return count
            },0);
        default:
          return Object.values(tasks)
            .reduce((count,task)=>{
              if (
                task[targetFeature]?.slice(0, 10) >= getDateFromToday()
                && task[targetFeature]?.slice(0, 10) <= targetValue
                && !task['completed']
                ) count++;
              return count
            },0);
      }
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
  const {expander, listName} = useContext(SidebarContext)
  const [expandSideBar, setExpandSideBar] = expander;
  const [currentListName, setListName] = listName
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

  useEffect(() => {
    dispatch(taskActions.getAllTasks())
  }, [dispatch, lists, tags])


  if (!tasks || !lists || !tags) return null

  const items = {
    'Tasks': {
      expanded: allTasksExpanded,
      expander: setAllTasksExpanded,
      title: 'Tasks',
      children: [['All Tasks', 'all', 'incomplete'], ['Today', 'today', getDateFromToday()], ['Tomorrow', 'tomorrow', getDateFromToday(1)], ['This Week', 'week', getDateFromToday(6)], ['Completed', 'completed', 'completed']]
        .map(([title, slug, targetVal]) => (
          <BannerItem
            key={title}
            obj={<Count count={getCount(tasks, 'tasks', targetVal)}/>}
            handleClick={()=>{
              setListName(title)
              history.push(`/app/lists/${slug}`)
            }}
            >
            {title}
          </BannerItem>
      ))
    },
    'Lists': {
      expanded: listsExpanded,
      expander: setListsExpanded,
      title: 'Lists',
      obj: <Plus  form={<CreateTagListForm/>} feature='list' thunk={listActions.createList}/>,
      children: Object.values(lists)
        .map(list => (
          <BannerItem
            key={list.id}
            obj={
              <>
              <DownCaret
                itemId={list.id}
                name={list.name}
                feature='list'
                />
              <Count
                count={getCount(tasks, 'listId', list.id)}
                />
            </>
            }
            handleClick={()=>{
              setListName(list.name)
              history.push(`/app/lists/${list.id}`)
            }}
            >
            {list.name}
          </BannerItem>
      ))
    },
    'Tags': {
      expanded: tagsExpanded,
      expander: setTagsExpanded,
      title: 'Tags',
      obj: <Plus  form={<CreateTagListForm/>} feature='tag' thunk={tagActions.createTag}/>,
      children: Object.values(tags).map(tag => (
        <BannerItem
          key={tag.id}
          color={tag.color ? tag.color : '#006400'}
          obj={
            <>
            <DownCaret
              itemId={tag.id}
              name={tag.name}
              color={tag.color}
              feature='tag'
              />
            <Count count={getCount(tasks, 'tags', tag.id)}/>
          </>
        }
          handleClick={()=>{
            setListName(tag.name)
            history.push(`/app/tags/${tag.id}`)
          }}
          >
          {tag.name}
        </BannerItem>))
    },
  };

  return (
    <div
      className='sidebar'
      id={`${expandSideBar? '' : 'hidden'}`}>
      <div className='logo_container'>
        <img
          className='tasb-top-logo'
          id={`${expandSideBar? '' : 'hidden'}`}
          onClick={()=>history.push('/')}
          src={logo} />
      </div>
      <div
        className='sidebar-content'
        id={`${expandSideBar? '' : 'hidden'}`}
        >
        {Object.keys(items).map(itemName => (
          <Collapser
            key={itemName}
            title={items[itemName]['title']}
            expanded={items[itemName]['expanded']}
            expander={items[itemName]['expander']}
            obj={items[itemName]['obj']}
          >
            {items[itemName]['children']}
          </Collapser>
        ))}
      </div>
    </div>
  )
};
