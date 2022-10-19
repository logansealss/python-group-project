import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleTask } from '../../store/tasks';
import './taskDetailPanel.css';

export default function TaskDetailPanel() {

    const { taskId } = useParams();
    const dispatch = useDispatch();
    const task = useSelector(state => {
        return state.tasks.singleTask;
    });

    useEffect(() => {
        dispatch(getSingleTask(taskId));
    }, [dispatch , taskId]);

    if (!task) return null;

    return ( task &&
        <div className='tad-main-panel'>
                SingleTask:{' '}
                {JSON.stringify(task)}
        </div>
    )
}
