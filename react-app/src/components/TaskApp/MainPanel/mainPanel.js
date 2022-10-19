import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useParams, Redirect } from 'react-router-dom';


import { getAllTasks } from '../../../store/tasks';
import TaskRowItem from './taskRowItem';
import CreateTaskSubPanel from './createTaskSubPanel';
import {
    getDateFromToday,
    getListDetailsFromDates,
    getListDetailsFromList,
    getListDetailsFromTag
} from '../../../utils/taskLists'
import './mainPanel.css';

export default function MainPanel() {

    const { path, url } = useRouteMatch();
    let { listId, filterId } = useParams();
    listId = listId ? listId.toLowerCase() : listId
    filterId = filterId ? filterId.toLowerCase() : filterId

    const dispatch = useDispatch();
    const tasks = useSelector(state => {
        return state.tasks.allTasks;
    });
    const tags = useSelector(state => {
        return state.tags;
    });
    const lists = useSelector(state => {
        return state.lists;
    });

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    let listDetails = null;
    let taskObj = tasks ? tasks : {};

    if (filterId === 'lists') {

        if (listId === "all" || listId === undefined) {
            listDetails = getListDetailsFromDates(taskObj)
            listDetails.name = "All Tasks"
        } else if (listId === "today") {
            listDetails = getListDetailsFromDates(taskObj, getDateFromToday(), getDateFromToday())
            listDetails.name = "Today"
        } else if (listId === "tomorrow") {
            listDetails = getListDetailsFromDates(taskObj, getDateFromToday(1), getDateFromToday(1))
            listDetails.name = "Tomorrow"
        } else if (listId === "week") {
            listDetails = getListDetailsFromDates(taskObj, getDateFromToday(), getDateFromToday(6))
            listDetails.name = "This Week"
        } else {

            let list = lists && Object.values(lists).find(lst => lst.id === +listId)

            if (list) {
                listDetails = getListDetailsFromList(taskObj, +listId)
                listDetails.name = list.name
            } else if (list === undefined) {
                return <Redirect to="/app/lists/all"></Redirect>
            }
        }

    } else if (filterId === 'tags') {

        let tag = tags && Object.values(tags).find(tag => tag.id === +listId)

        if (tag) {
            listDetails = getListDetailsFromTag(taskObj, +listId)
            listDetails.name = tag.name
        } else if (tag === undefined) {
            return <Redirect to="/app/lists/all"></Redirect>
        }

    } else {
        return <Redirect to="/app/list/all"></Redirect>
    }

    return (tasks && lists && tags &&
        <div className='tam-main-div'>
            <CreateTaskSubPanel lists={lists} tags={tags} />
            <div className='tam-task-list-div'>
                {listDetails && listDetails.tasks.map((task, idx) => (
                    <Link
                        key={idx}
                        className='mpti-link-wrap'
                        to={`/app/${filterId}/${listId}/${task.id}`}
                    >
                        <TaskRowItem task={task}/>
                    </Link>
                ))}
            </div>
        </div >
    )
}
