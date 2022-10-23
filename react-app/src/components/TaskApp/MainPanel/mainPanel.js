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

    const dispatch = useDispatch();
    const tasks = useSelector(state =>state.tasks.allTasks);
    const tags = useSelector(state => state.tags);
    const lists = useSelector(state =>state.lists);


    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    let listDetails = getListDetails(params, tasks, lists, tags)
    setListName(listDetails.name)
    if (typeof listDetails === "string") {
        return <Redirect to={listDetails}></Redirect>
    }

    return (tasks && lists && tags &&
        <div className='tam-main-div'>
            <CreateTaskSubPanel lists={lists} tags={tags} />
            <div className='tam-task-list-div'>
                {listDetails && listDetails.tasks.map((task, idx) => (
                    <Link
                        key={idx}
                        className='mpti-link-wrap'
                        to={`/app/${params.filterId}/${params.listId}/${task.id}`}
                    >
                        <TaskRowItem task={task} />
                    </Link>
                ))}
            </div>
        </div >
    )
}
