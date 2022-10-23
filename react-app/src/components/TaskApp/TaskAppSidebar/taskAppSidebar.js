import React, { useEffect, useState, useContext, useRef, createRef } from 'react';
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
          switch (targetValue) {
            case getDateFromToday():
              return Object.values(tasks)
              .reduce((count,task)=>{
                if (
                  task['dueDate']?.slice(0, 10) === targetValue
                  && !task['completed']
                  ) count++;
                  return count
                },0);
            case getDateFromToday(1):
              return Object.values(tasks)
              .reduce((count,task)=>{
                if (
                  task['dueDate']?.slice(0, 10) === targetValue
                  && !task['completed']
                  ) count++;
                  return count
                },0);
            case getDateFromToday(6):
              return Object.values(tasks)
              .reduce((count,task)=>{
                if (
                  task['dueDate']?.slice(0, 10) >= getDateFromToday()
                  && task['dueDate']?.slice(0, 10) <= targetValue
                  && !task['completed']
                  ) count++;
                  return count
                },0);
          };
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
  const [expandSideBar, _setExpandSideBar] = expander;
  const [_currentListName, setListName] = listName
  const dispatch = useDispatch()
  const history = useHistory();
  const tasks = useSelector(state => state.tasks.allTasks)
  const lists = useSelector(state => state.lists)
  const tags = useSelector(state => state.tags)

  const [allTasksExpanded, setAllTasksExpanded] = useState(false)
  const [listsExpanded, setListsExpanded] = useState(false)
  const [tagsExpanded, setTagsExpanded] = useState(false)

  const listRefs = useRef([])
  const listCaretRefs = useRef([])
  const tagRefs = useRef([])
  const tagCaretRefs = useRef([])

  useEffect(() => {
    dispatch(taskActions.getAllTasks())
    dispatch(listActions.getAllLists())
    dispatch(tagActions.getAllTags())
  }, [dispatch])

  useEffect(() => {
    dispatch(taskActions.getAllTasks())
  }, [dispatch, lists, tags])


  if (!tasks || !lists || !tags) return null

  listRefs.current = Object.values(lists)
    .map((_, i) => listRefs.current[i] ?? createRef());

  listCaretRefs.current = Object.values(lists)
    .map((_, i) => listCaretRefs.current[i] ?? createRef());

  tagRefs.current = Object.values(tags)
    .map((_, i) => tagRefs.current[i] ?? createRef());

  tagCaretRefs.current = Object.values(tags)
    .map((_, i) => tagCaretRefs.current[i] ?? createRef());




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
              history.push(`/app/${slug}`)
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
        .map((list, idx) => (

          <BannerItem
            ref={listRefs.current[idx]}
            key={list.id}
            obj={
              <>
              <DownCaret
                ref={listCaretRefs.current[idx]}
                itemId={list.id}
                name={list.name}
                feature='list'
                />
              <Count
                count={getCount(tasks, 'listId', list.id)}
                />
            </>
            }
            handleClick={(e)=>{

              if(e.target.isSameNode(listCaretRefs.current[idx].current)){
                return;
              }

              if(listRefs.current[idx].current.contains(e.target)){
                setListName(list.name)
                history.push(`/app/lists/${list.id}`)
              }
              // setListName(list.name)
              // history.push(`/app/lists/${list.id}`)
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
      children: Object.values(tags).map((tag, idx) => (
        <BannerItem
        ref={tagRefs.current[idx]}
          key={tag.id}
          color={tag.color ? tag.color : '#006400'}
          obj={
            <>
            <DownCaret
              ref={tagCaretRefs.current[idx]}
              itemId={tag.id}
              name={tag.name}
              color={tag.color}
              feature='tag'
              />
            <Count count={getCount(tasks, 'tags', tag.id)}/>
          </>
        }handleClick={(e)=>{

          if(e.target.isSameNode(tagCaretRefs.current[idx].current)){
            return;
          }

          if(tagRefs.current[idx].current.contains(e.target)){
            setListName(tag.name)
            history.push(`/app/tags/${tag.id}`)
          }
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
