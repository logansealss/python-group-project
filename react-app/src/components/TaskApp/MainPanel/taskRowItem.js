import React from 'react';
import { deleteSingleTask } from '../../../store/tasks';
import { useDispatch } from 'react-redux';
import moveIcon from '../../../img/ellipsis-vertical.svg';
import caretRight from '../../../img/caret-right.svg';
import trashIcon from '../../../img/trash.svg';
import './taskRowItem.css';

export default function TaskRowItem({ task }) {

    const dispatch = useDispatch()

    const trashClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(deleteSingleTask(task.id));
    }

    let priorityClassName = 'tri-prio-indi';
    if (task.priority === 1){
        priorityClassName += ' tri-prio-high'
    }else if (task.priority === 2){
        priorityClassName += ' tri-prio-medium'
    }else if (task.priority === 3){
        priorityClassName += ' tri-prio-low'
    }

    return (
        <div className='tri-main-div'>
                <img className='tri-move-grab' src={caretRight} />
                <div className={priorityClassName}></div>
                {/* <div className='tri-checkbox-div'>
                    <input
                        className='tri-checkbox'
                        type='checkbox'
                    />
                </div> */}
                <div className='tri-inner-grp'>

                    <div className='tri-task-name'>
                        {task.name}
                    </div>
                    <div className='tri-tags'>
                        tag
                    </div>
                    <img
                        className='tri-trash'
                        src={trashIcon}
                        onClick={trashClick}
                    />
                </div>
        </div>
    )
}
