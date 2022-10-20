import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useParams, Redirect } from 'react-router-dom';


import { getAllTasks } from '../../../store/tasks';
import TaskRowItem from './taskRowItem';
import CreateTaskSubPanel from './createTaskSubPanel';
import { getListDetails } from '../../../utils/taskLists'
import './mainPanel.css';

export default function MainPanel() {

    const { path, url } = useRouteMatch();
    const params = useParams();

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

    let listDetails = getListDetails(params, tasks, lists, tags)

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
