import React from 'react'

export default function TaskRowItem({task}) {
  return (
    <div className='tri-main-div'>
        <div className='tri-task-name'>
            {task.name}
        </div>
    </div>
  )
}
