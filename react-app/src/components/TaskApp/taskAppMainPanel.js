import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../store/tasks';
import './taskAppMainPanel.css';

export default function TaskAppMainPanel() {

    const dispatch = useDispatch();
    const allTasks = useSelector(state => {
        return state.tasks.allTasks;
    });

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    if (!allTasks) return null;

    return ( allTasks &&
        <div className='tam-main-div'>
            Tasks:
            <ul>
                {Object.values(allTasks).map(task => (
                    <li>{`${JSON.stringify(task)}`}</li>
                ))}
            </ul>
        </div>
    )
}
