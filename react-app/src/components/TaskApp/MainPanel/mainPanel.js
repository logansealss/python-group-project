import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useParams } from 'react-router-dom';
import { getAllTasks } from '../../../store/tasks';
import TaskRowItem from './taskRowItem';
import CreateTaskSubPanel from './createTaskSubPanel';
import './mainPanel.css';

export default function MainPanel() {

    const { path, url } = useRouteMatch();
    const { listId } = useParams();

    const dispatch = useDispatch();
    const allTasks = useSelector(state => {
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

    return (allTasks && tags && lists &&
        <div className='tam-main-div'>
            <CreateTaskSubPanel lists={lists} tags={tags} />
            <div className='tam-task-list-div'>
                {Object.values(allTasks).map((task, idx) => (
                    <Link
                        key={idx}
                        className='mpti-link-wrap'
                        to={`/app/${listId}/${task.id}`}
                    >
                        <TaskRowItem task={task} />
                    </Link>
                ))}
            </div>
        </div >
    )
}
