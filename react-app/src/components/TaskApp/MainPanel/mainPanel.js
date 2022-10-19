import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';


import { getAllTasks } from '../../../store/tasks';
import TaskRowItem from './taskRowItem';
import CreateTaskSubPanel from './createTaskSubPanel';
import { 
    getDateFromToday, 
    getListDetailsFromDates, 
    getListDetailsFromList } from '../../../utils/taskLists'
import './mainPanel.css';  

export default function MainPanel() {

    const { listId } = useParams();
    const dispatch = useDispatch();
    const tasks = useSelector(state => {
        return state.tasks.allTasks;
    });
    const lists = useSelector(state => state.lists)

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    let listDetails = null;
    console.log("list id in main panel", listId)

    if (listId === "all" || listId === undefined) {
        listDetails = getListDetailsFromDates(tasks)
        listDetails.name = "All Tasks"
    } else if (listId === "today") {
        listDetails = getListDetailsFromDates(tasks, getDateFromToday(), getDateFromToday())
        listDetails.name = "Today"
    } else if (listId === "tomorrow") {
        listDetails = getListDetailsFromDates(tasks, getDateFromToday(1), getDateFromToday(1))
        listDetails.name = "Tomorrow"
    } else if (listId === "week") {
        listDetails = getListDetailsFromDates(tasks, getDateFromToday(), getDateFromToday(6))
        listDetails.name = "This Week"
    } else {

        let list = lists && Object.values(lists).find(lst => lst.id === +listId)

        if (list) {
            listDetails = getListDetailsFromList(tasks, +listId)
            listDetails.name = list.name
        }else if(list === undefined){
            return <Redirect to="/app/all"></Redirect>
        }
    }

    return (
        <div className='tam-main-div'>
            <CreateTaskSubPanel />
            <div className='tam-task-list-div'>
                {listDetails && listDetails.tasks.map(task => (
                    <TaskRowItem task={task} />
                ))}
            </div>
        </div>
    )
}
