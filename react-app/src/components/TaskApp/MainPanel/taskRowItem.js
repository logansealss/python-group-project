import React from 'react';
import moveIcon from '../../../img/ellipsis-vertical.svg'
import './taskRowItem.css';

export default function TaskRowItem({ task }) {
    return (
        <div className='tri-main-div'>
            <img className='tri-move-grab' src={moveIcon} />
            <div className='tri-prio-indi'></div>
            <div className='tri-checkbox-div'>
                <input
                    className='tri-checkbox'
                    type='checkbox'
                />
            </div>
            <div className='tri-inner-grp'>

                <div className='tri-task-name'>
                    {task.name}
                </div>
                <div className='tri-tags'>
                    tag
                </div>
            </div>
        </div>

    )
}
