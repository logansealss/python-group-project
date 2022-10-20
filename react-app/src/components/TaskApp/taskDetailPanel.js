import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleTask } from '../../store/tasks';
import { updateATask } from '../../store/tasks';
import selectMenuTimes from '../../data/selectMenuTimes.json';
import dueDateIcon from '../../img/calendar-day.svg';
import startDateIcon from '../../img/square-caret-right.svg';
import postponeIcon from '../../img/calendar-plus.svg';
import prioIcon from '../../img/exclamation.svg';
import listIcon from '../../img/list.svg';
import repeatIcon from '../../img/rotate.svg';
import clockIcon from '../../img/clock.svg';
import locationPin from '../../img/location-dot.svg';
import userIcon from '../../img/user.svg';
import checkIcon from '../../img/check.svg';
import tagIcon from '../../img/tag.svg';
import minusIcon from '../../img/minus.svg';
import EliIcon from '../../img/ellipsis.svg';
import downCaret from '../../img/caret-down.svg';
import editIcon from '../../img/pen-to-square.svg'
import './taskDetailPanel.css';

import './taskDetailPanel.css';

export default function TaskDetailPanel() {

    const params = useParams();
    const { listId, taskId } = params;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleTask(taskId));
    }, [dispatch, taskId]);

    const task = useSelector(state => {
        return state.tasks.singleTask;
    });
    const tags = useSelector(state => {
        return state.tags;
    });
    const lists = useSelector(state => {
        return state.lists;
    });

    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [taskList, setTaskList] = useState(listId);
    const [prio, setPrio] = useState('');
    const [taskTags, setTaskTags] = useState([]);
    const [estimate, setEstimate] = useState('');
    const [estimateUnit, setEstimateUnit] = useState(1)

    const [renderCtForm, setRenderCtForm] = useState(false);
    const [formDiv, setFormDiv] = useState();

    const formRef = useRef();

    const openForm = () => {
        setRenderCtForm(true);
        if (formDiv) {
            formDiv.style.height = '340px'
        }
    }

    const closeForm = () => {
        setRenderCtForm(false);
        if (formDiv) {
            formDiv.style.height = '0px';
        }
    }

    useEffect(() => {
        setFormDiv(document.getElementsByClassName('tad-add-task-grp')[0]);
        console.log('wat?', formDiv)
        if (formDiv) {
            formDiv.style.height = '0px';
        }
    }, [formRef, task]);

    // useEffect(() => {
    //     if (taskName.length && !renderCtForm) {
    //         openForm();
    //     } else if (!taskName.length && renderCtForm) {
    //         closeForm();
    //     }
    // }, [taskName]);


    useEffect(() => {
        if (task) {
            task.name && setTaskName(task.name);
            task.dueDate && setDueDate(task.dueDate.split(' ')[0]);
            task.dueDate && setDueTime(task.dueDate.split(' ')[1]);
            task.startDate && setStartDate(task.startDate.split(' ')[0]);
            task.startDate && setStartTime(task.startDate.split(' ')[1]);
            task.listId && setTaskList(task.listId);
            task.priority && setPrio(task.priority);
            task.tags && setTaskTags(task.tags);
            task.duration && setEstimate(task.duration);
        }
    }, [task]);


    const handleUtSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: taskName,
            priority: prio,
            start_date: startDate + ' ' + startTime,
            due_date: dueDate + ' ' + dueTime,
            list_id: taskList,
            duration: Math.ceil(estimate * estimateUnit)
        }

        console.log('ct form data: ', data);
        console.log(dispatch(updateATask(task.id, data)))
    }

    return (task && lists && tags &&
        <div className='tad-main-panel'>
            <form
                onSubmit={handleUtSubmit}
                className='tad-form-el'
            >
                <div
                    className='tad-main-div'
                >
                    <div className='tad-ct-pseudo-input'>
                        <input
                            className='tad-ct-input'
                            type='text'
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        // onFocus={() => { setRenderAddTaskGrpClass('tad-ratgc-true') }}
                        // onBlur={() => { !ctInput.length && setRenderAddTaskGrpClass('tad-ratgc-false') }}
                        // onKeyDown={keyDownFn}
                        />
                        <div
                            className='tad-edit-div'
                            onClick={renderCtForm ? closeForm : openForm}
                        >
                            <img className='tad-edit-icon' src={editIcon} />
                        </div>
                    </div>
                    <div
                        className={`tad-add-task-grp`}
                        id='tad-form-div'
                        ref={formRef}
                    >
                        <div className='tad-top-half'>
                            <div className='tad-top-left-grp'>
                                <div className='tad-top-grp'>
                                    <div className='tad-due-date-grp'>
                                        <div className='tad-date-label-div'>
                                            <p className='tad-date-label'>Due Date</p>
                                        </div>
                                        <input
                                            className='tad-date-input'
                                            type='date'
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                        />
                                        <select
                                            className='tad-time-select'
                                            value={dueTime}
                                            onChange={(e) => setDueTime(e.target.value)}
                                        >
                                            <option value=''>Due Time</option>
                                            {selectMenuTimes.map((option) =>
                                                <option value={option.value}>{option.display}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className='tad-due-date-grp'>
                                        <div className='tad-date-label-div'>
                                            <p className='tad-date-label'>Due Date</p>
                                        </div>
                                        <input
                                            className='tad-date-input'
                                            type='date'
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                        <select
                                            className='tad-time-select'
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                        >
                                            <option value=''>Start Time</option>
                                            {selectMenuTimes.map((option) =>
                                                <option value={option.value}>{option.display}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className='tad-mid-grp-lf'>
                                    <select
                                        className='tad-time-select'
                                        value={`${prio}`}
                                        onChange={(e) => setPrio(Number(e.target.value))}
                                    >
                                        <option value=''>Priority</option>
                                        <option value='1'>High</option>
                                        <option value='2'>Med</option>
                                        <option value='3'>Low</option>
                                        <option value='0'>None</option>
                                    </select>
                                    <select
                                        className='tad-time-select'
                                        value={taskList}
                                        onChange={(e) => setTaskList(e.target.value)}
                                    >
                                        <option value=''>List</option>
                                        {Object.values(lists).map((l) =>
                                            <option value={l.id}>{l.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className='tad-left-bot-grp'>
                                    <input
                                        className='tad-time-input'
                                        placeholder='Time estimate'
                                        type='number'
                                        value={estimate}
                                        onChange={(e) => setEstimate(e.target.value)}
                                    />

                                    <select
                                        className='tad-time-select'
                                        value={`${estimateUnit}`}
                                        onChange={(e) => setEstimateUnit(Number(e.target.value))}
                                    >
                                        <option value='1'>Minutes</option>
                                        <option value='60'>Hours</option>

                                    </select>
                                </div>
                            </div>
                            <div className='tad-tag-grp'>
                                <select
                                    className='tad-tag-input'
                                    multiple
                                    value={taskTags}
                                    onChange={(e) => setTaskTags(
                                        Array.from(e.target.selectedOptions).map((el) => (
                                            el.value)))}
                                >
                                    <optgroup label='Tags' />
                                    {Object.values(tags).map((t) =>
                                        <option className='sel-op' value={t.id}>{t.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className='tad-at-btn-div'>
                            <div className={`tad-add-task-grp-icons`}>
                                <img
                                    className='tad-at-icon-style'
                                    src={dueDateIcon}
                                />

                                <img className='tad-at-icon-style' src={startDateIcon} />
                                <img className='tad-at-icon-style' src={listIcon} />
                                <img className='tad-at-icon-style' src={prioIcon} />
                                {/* <img className='tad-at-icon-style' src={repeatIcon} />
                            <img className='tad-at-icon-style' src={locationPin} /> */}
                                <img className='tad-at-icon-style' src={clockIcon} />
                            </div>
                            <button
                                className='tad-ct-submit-btn'
                                type='submit'
                                disabled={taskName.length ? false : true}
                            >
                                Update Task
                            </button>
                        </div>
                    </div>

                </div >
            </form >
        </div>
    )
}
