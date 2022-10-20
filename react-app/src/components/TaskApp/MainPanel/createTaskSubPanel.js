import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewTask } from '../../../store/tasks';
import dueDateIcon from '../../../img/calendar-day.svg';
import startDateIcon from '../../../img/square-caret-right.svg';
import postponeIcon from '../../../img/calendar-plus.svg';
import prioIcon from '../../../img/exclamation.svg';
import listIcon from '../../../img/list.svg';
import repeatIcon from '../../../img/rotate.svg';
import clockIcon from '../../../img/clock.svg';
import locationPin from '../../../img/location-dot.svg';
import userIcon from '../../../img/user.svg';
import checkIcon from '../../../img/check.svg';
import tagIcon from '../../../img/tag.svg';
import minusIcon from '../../../img/minus.svg';
import EliIcon from '../../../img/ellipsis.svg';
import downCaret from '../../../img/caret-down.svg';
import './createTaskSubPanel.css';
import selectMenuTimes from '../../../data/selectMenuTimes.json';

export default function CreateTaskSubPanel({ lists, tags }) {

    const params = useParams();
    const dispatch = useDispatch();
    const { listId } = params;

    // const [ctInput, setCtInput] = useState('');
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
    // const [ctInputState, setCtInputState] = ([]);
    const [renderAddTaskGrpClass, setRenderAddTaskGrpClass] = useState(
        'ctsp-ratgc-true'
    );
    const [renderTaskFormIconClass, setRenderTaskFormIconClass] = useState(
        'ctsp-ratig-false'
    )

    // const ctDiv = document.getElementsByClassName('ctsp-main-div');
    // // const ctspNameDiv = document.getElementsByClassName('ctsp-name-div');

    const [ctspNameDiv, setCtspNameDiv] = useState(
        document.getElementsByClassName('ctsp-name-div')[0]);

    useEffect(() => {
        if (taskName.length) {
            setRenderTaskFormIconClass('ctsp-ratig-true');
        } else {
            setRenderTaskFormIconClass('ctsp-ratig-false');
        }
        console.log(startDate + ' ' + startTime)
    }, [taskName, taskTags, dueDate, startDate, startTime]);


    const handleCtSubmit = (e) => {
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

        console.log(dispatch(createNewTask(data)))
    }

    // const nameDivClick = () => {
    //     if (!document.getElementsByClassName('ctsp-name-div')[0].children.length) {
    //         const input = document.createElement('input')
    //         input.className = 'ctsp-name-input';
    //         ctspNameDiv.innerText = '';
    //         ctspNameDiv.appendChild(input);
    //         input.value = taskName;
    //         input.focus()
    //         input.style.width = input.value.trim().length + 'ch'
    //         input.innerText = taskName;
    //     }
    // }

    // function manageNameDiv() {
    //         console.log(ctInput);
    //         setTaskName(ctInput);
    //         // tnInput.style.width = tnInput.value.trim().length + 'ch'
    //         ctspNameDiv.innerText = ctInput;
    //         setCtInput('');
    // }

    // const keyDownFn = (e) => {
    //     if (e.key === '!') {
    //         console.log('key pressed!:', e.key)
    //         manageNameDiv();
    //     }
    // }

    return (
        <form
            onSubmit={handleCtSubmit}
            className='ctsp-form-el'
        >
            <div
                className='ctsp-main-div'
            >
                {/* <div className='ctsp-ut-main-div'>
                    <div className='ctsp-ut-grp-1'>
                        <div className='ctsp-btn-div-solo-single ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={minusIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                    </div>
                    <div className='ctsp-ut-grp-2'>
                        <div className='ctsp-btn-div-left ctsp-ut-btn' >
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={checkIcon}
                            />
                        </div>
                        <div className='ctsp-btn-div-center-solo ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={postponeIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                        <div className='ctsp-btn-div-rt ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={userIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                    </div>
                    <div className='ctsp-ut-grp-3'>
                        <div className='ctsp-btn-div-left ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={prioIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                        <div className='ctsp-btn-div-center-solo ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={dueDateIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                        <div className='ctsp-btn-div-center ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={listIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                        <div className='ctsp-btn-div-rt ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={tagIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                    </div>
                    <div className='ctsp-ut-grp-4'>
                        <div className='ctsp-btn-div-solo-single ctsp-ut-btn'>
                            <img
                                className='ctsp-ut-icon-style ctsp-ut-hover-style'
                                src={EliIcon}
                            />
                            <img
                                className='ctsp-ut-caret-style ctsp-ut-hover-style'
                                src={downCaret}
                            />
                        </div>
                    </div>
                </div> */}
                {/* <div className='ctsp-ct-input-main'> */}
                <div className='ctsp-ct-pseudo-input'>
                    <input
                        className='ctsp-ct-input'
                        type='text'
                        placeholder='Add a task...'
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    // onFocus={() => { setRenderAddTaskGrpClass('ctsp-ratgc-true') }}
                    // onBlur={() => { !ctInput.length && setRenderAddTaskGrpClass('ctsp-ratgc-false') }}
                    // onKeyDown={keyDownFn}
                    />
                </div>
                <div
                    className={`ctsp-add-task-grp ${renderAddTaskGrpClass}`}
                >
                    <div className='ctsp-top-half'>
                        <div className='ctsp-top-left-grp'>
                            <div className='ctsp-top-grp'>
                                <div className='ctsp-due-date-grp'>
                                    <input
                                        className='ctsp-date-input'
                                        type='date'
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                    />
                                    <select
                                        className='ctsp-time-select'
                                        value={dueTime}
                                        onChange={(e) => setDueTime(e.target.value)}
                                    >
                                        <option value=''>Due Time</option>
                                        {selectMenuTimes.map((option) =>
                                            <option value={option.value}>{option.display}</option>
                                        )}
                                    </select>
                                </div>
                                <div className='ctsp-due-date-grp'>
                                    <input
                                        className='ctsp-date-input'
                                        type='date'
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                    <select
                                        className='ctsp-time-select'
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
                            <div className='ctsp-mid-grp-lf'>
                                <select
                                    className='ctsp-time-select'
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
                                    className='ctsp-time-select'
                                    value={taskList}
                                    onChange={(e) => setTaskList(e.target.value)}
                                >
                                    <option value=''>List</option>
                                    {Object.values(lists).map((l) =>
                                        <option value={l.id}>{l.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className='ctsp-left-bot-grp'>
                                <input
                                    className='ctsp-time-input'
                                    type='number'
                                    value={estimate}
                                    onChange={(e) => setEstimate(e.target.value)}
                                />

                                <select
                                    className='ctsp-time-select'
                                    value={`${estimateUnit}`}
                                    onChange={(e) => setEstimateUnit(Number(e.target.value))}
                                >
                                    <option value='1'>Minutes</option>
                                    <option value='60'>Hours</option>

                                </select>
                            </div>
                        </div>
                        <div className='ctsp-tag-grp'>
                            <select
                                className='ctsp-tag-input'
                                multiple
                                value={taskTags}
                                onChange={(e) => setTaskTags(
                                    Array.from(e.target.selectedOptions).map((el) => (
                                        el.value)))}
                            >
                                <optgroup label='Tags'/>
                                {Object.values(tags).map((t) =>
                                    <option className='sel-op' value={t.id}>{t.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className='ctsp-at-btn-div'>
                        <div className={`ctsp-add-task-grp-icons ${renderTaskFormIconClass}`}>
                            <img
                                className='ctsp-at-icon-style'
                                src={dueDateIcon}
                            />

                            <img className='ctsp-at-icon-style' src={startDateIcon} />
                            <img className='ctsp-at-icon-style' src={listIcon} />
                            <img className='ctsp-at-icon-style' src={prioIcon} />
                            {/* <img className='ctsp-at-icon-style' src={repeatIcon} />
                            <img className='ctsp-at-icon-style' src={locationPin} /> */}
                            <img className='ctsp-at-icon-style' src={clockIcon} />
                        </div>
                        <button
                            className='ctsp-ct-submit-btn'
                            type='submit'
                            disabled={taskName.length ? false : true}
                        >
                            Add Task
                        </button>
                    </div>
                </div>

                {/* </div> */}
            </div >
        </form >
    )
}
