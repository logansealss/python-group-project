import React from 'react';
import moveIcon from '../../img/ellipsis-vertical.svg'
import './taskRowItem.css';

export default function TaskRowItem({task}) {
  return (
    <div className='tri-main-div'>
        <img className='tri-move-grab' src={moveIcon}/>
        <div className='tri-prio-indi'></div>
        <input
            className='tri-checkbox'
            type='checkbox'
        />
        <div className='tri-task-name'>
            {task.name}
        </div>
    </div>

  )
}
