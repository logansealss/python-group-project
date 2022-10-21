import React from 'react';
import { deleteSingleTask } from '../../../store/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moveIcon from '../../../img/ellipsis-vertical.svg';
import caretRight from '../../../img/caret-right.svg';
import trashIcon from '../../../img/trash.svg';
import './taskRowItem.css';

export default function TaskRowItem({ task }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const tags = useSelector(state => state.tags);

    const trashClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(deleteSingleTask(task.id));
        history.push(`/app/lists/${params.listId}`);
    }

    let priorityClassName = 'tri-prio-indi';
    if (task.priority === 1) {
        priorityClassName += ' tri-prio-high'
    } else if (task.priority === 2) {
        priorityClassName += ' tri-prio-medium'
    } else if (task.priority === 3) {
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

                <span className='tri-task-name'>
                    {task.name}
                </span>
                {task.tags.map(tagId => tags[tagId] ? (
                    <span key={tagId} className='tri-tags' style={{ backgroundColor: tags[tagId].color }}>
                        {tags[tagId].name}
                    </span>)
                    : null
                )}
            </div>
            <div
                className='tri-trash'
                onClick={trashClick}
            >
                <img
                    src={trashIcon}
                />
            </div>
        </div>
    )
}
