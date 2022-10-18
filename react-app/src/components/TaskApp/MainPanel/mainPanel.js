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
    const { params } = useParams();

    // const linkPath = createLinkPath();

    // function createLinkPath() {
    //     if (
    //         path.includes('all') ||
    //         path.includes('today') ||
    //         path.includes('tomorrow')
    //     ) {
    //         return `${path}/${task.id}`
    //     } else
    // }

    const dispatch = useDispatch();
    const allTasks = useSelector(state => {
        return state.tasks.allTasks;
    });

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    if (!allTasks) return null;

    return (allTasks &&
        <div className='tam-main-div'>
            <CreateTaskSubPanel />
            <div className='tam-task-list-div'>
                {Object.values(allTasks).map(task => (
                    <Link
                        className='mpti-link-wrap'
                        to={`${path}/${task.id}`}
                    >
                        <TaskRowItem task={task} />
                    </Link>
                ))}
            </div>
        </div >
    )
}
