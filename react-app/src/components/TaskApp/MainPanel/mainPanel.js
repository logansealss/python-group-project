import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../../store/tasks';
import TaskRowItem from './taskRowItem';
import CreateTaskSubPanel from './createTaskSubPanel';
import './mainPanel.css';

export default function MainPanel() {

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
                    <TaskRowItem task={task} />
                ))}
            </div>
        </div>
    )
}
