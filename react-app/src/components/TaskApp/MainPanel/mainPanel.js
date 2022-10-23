import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect, Link } from 'react-router-dom';


import { getAllTasks } from '../../../store/tasks';
import TaskRowItem from './taskRowItem';
import CreateTaskSubPanel from './createTaskSubPanel';
import { getListDetails } from '../../../utils/taskLists'
import { SidebarContext } from '../../../context/Sidebar';
import './mainPanel.css';

export default function MainPanel() {
    const {listName} = useContext(SidebarContext);
    const [_listName, setListName] = listName;
    const params = useParams();
    console.log(params)
    const dispatch = useDispatch();
    const tasks = useSelector(state =>state.tasks.allTasks);
    const tags = useSelector(state => state.tags);
    const lists = useSelector(state =>state.lists);


    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    let listDetails = getListDetails(params, tasks, lists, tags)
    if (typeof listDetails === "string") {
        return <Redirect to={listDetails}></Redirect>
    } else if (listDetails) setListName(listDetails.name)

    return (tasks && lists && tags &&
        <div className='tam-main-div'>
            <CreateTaskSubPanel lists={lists} tags={tags} />
            <div className='tam-task-list-div'>
                {listDetails && listDetails.tasks.map((task, idx) => (
                    <Link
                        key={idx}
                        className='mpti-link-wrap'
                        to={`/app/${params.filter}/${params.featureId}/${task.id}`}
                    >
                        <TaskRowItem task={task} />
                    </Link>
                ))}
            </div>
        </div >
    )
}
