import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewTask, addTagToTask } from '../../../store/tasks';
import dueDateIcon from '../../../img/calendar-day.svg';
import startDateIcon from '../../../img/square-caret-right.svg';
import clockIcon from '../../../img/clock.svg';
import prioIcon from '../../../img/exclamation.svg';
import listIcon from '../../../img/list.svg';
import './createTaskSubPanel.css';
import selectMenuTimes from '../../../data/selectMenuTimes.json';
// import postponeIcon from '../../../img/calendar-plus.svg';
// import repeatIcon from '../../../img/rotate.svg';
// import locationPin from '../../../img/location-dot.svg';
// import userIcon from '../../../img/user.svg';
// import checkIcon from '../../../img/check.svg';
// import tagIcon from '../../../img/tag.svg';
// import minusIcon from '../../../img/minus.svg';
// import EliIcon from '../../../img/ellipsis.svg';
// import downCaret from '../../../img/caret-down.svg';

export default function CreateTaskSubPanel({ lists, tags }) {

    const params = useParams();
    const dispatch = useDispatch();
    const { filter, featureId } = params;


    const [taskList, setTaskList] = useState('');
    const [taskTags, setTaskTags] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [prio, setPrio] = useState('');
    const [estimate, setEstimate] = useState('');
    const [estimateUnit, setEstimateUnit] = useState(1)
    const [renderCtForm, setRenderCtForm] = useState(false);
    const [formDiv, setFormDiv] = useState();
    const [taskNameErr, setTaskNameErr] = useState()

    const [renderTaskFormIconClass, setRenderTaskFormIconClass] = useState(
        'ctsp-ratig-false'
    );

    const formRef = useRef();


    const openForm = () => {
        setRenderCtForm(true);
        formDiv.style.height = '340px'
    }

    const closeForm = () => {
        setRenderCtForm(false);
        formDiv.style.height = '0px';
    }

    const padNum = (num) => {
        return num.toString().padStart(2, '0');
    }

    const parseDateObj = (dateInput, timeInput) => {
        return new Date(dateInput + 'T' + timeInput);
    }

    const datesValid = () => {
        if (startDate && dueDate && dueTime) {
            return parseDateObj(startDate, startTime).getTime() <
                parseDateObj(dueDate, dueTime).getTime()
        }
        return true;
    }

    const compareTimeToStart = (time) => {
        if (startDate === dueDate) {
            return parseDateObj(startDate, startTime).getTime() >
                parseDateObj(startDate, time).getTime()
        } else {
            return false;
        }
    }

    const compareStartToCurrentTime = (time) => {
        if (startDate) {
            return parseDateObj(startDate, time).getTime() <
                new Date().getTime();
        }
        return false;
    }

    const dateToday = (date = new Date()) => {
        return [
            date.getFullYear(),
            padNum(date.getMonth() + 1),
            padNum(date.getDate()),
        ].join('-');
    }

    function resetTaskListTaskTags(){

        let newList = ''
        let newTags = [];

        if (filter === "tags") {
            if (tags[featureId]) {
                newTags = [featureId]
            }
        }else if(filter === 'lists'){
            if(lists[featureId]){
                newList = featureId
            }
        }

        setTaskList(newList)
        setTaskTags(newTags)
    }

    useEffect(() => {

        resetTaskListTaskTags()

    }, [featureId, filter])

    useEffect(() => {
        if (!datesValid()) {
            setDueDate(startDate)
            setDueTime(startTime)
        }

        if (!dueDate) {
            setDueTime('');
        }
        if (!startDate) {
            setStartTime('');
        }

    }, [startDate, startTime, dueDate, dueTime])

    useEffect(() => {
        setFormDiv(document.getElementById('ctsp-form-div'));
        if (formDiv) {
            formDiv.style.height = '0px';
        }
    }, [formRef]);

    useEffect(() => {
        if (taskName.length && !renderCtForm) {
            openForm();
        } else if (!taskName.length && renderCtForm) {
            closeForm();
        }

        if(taskName.length > 150){
            setTaskNameErr("Name is too long. Please choose a shorter name.")
        }else{
            setTaskNameErr()
        }

    }, [taskName]);

    const handleCtSubmit = async (e) => {
        e.preventDefault();

        if(taskNameErr){
            return;
        }

        const data = {}

        if (taskName.length) data.name = taskName
        if (Number(prio) && prio >= 0 && prio <= 3) {
            data.priority = prio;
        } else {
            data.priority = 0;
        }
        if (startDate.length && startTime.length) {
            data.start_date = startDate + ' ' + startTime
        } else if (startDate.length && !startTime.length) {
            data.start_date = startDate + ' ' + '00:01:00'
        }

        if (dueDate.length && dueTime.length) {
            data.due_date = dueDate + ' ' + dueTime
        } else if (dueDate.length && !dueTime.length) {
            data.due_date = dueDate + ' ' + '00:01:00'
        }
        if (Number(taskList)) data.list_id = taskList;
        if (Number(estimate)) data.duration = Math.ceil(estimate * estimateUnit);

        const response = await dispatch(createNewTask(data))

        if (response && response.id) {
            for (let tagId of taskTags) {
                await dispatch(addTagToTask(response.id, +tagId))
            }
            setTaskName('');
            setDueDate('')
            setDueTime('')
            setStartDate('')
            setStartTime('')
            setPrio('')
            setEstimate('')
            setEstimateUnit(1)

            resetTaskListTaskTags()

            closeForm();
        }

    }

    return (
        <form
            onSubmit={handleCtSubmit}
            className='ctsp-form-el'
        >
            <div
                className='ctsp-main-div'
            >
                <div className='ctsp-ct-pseudo-input'>
                    <input
                        className='ctsp-ct-input'
                        type='text'
                        placeholder='Add a task...'
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>
                {taskNameErr && (
                    <div id="name-error">
                        {taskNameErr}
                    </div>
                )}
                <div
                    className={'ctsp-add-task-grp'}
                    id='ctsp-form-div'
                    ref={formRef}
                >
                    <div className='ctsp-top-half'>
                        <div className='ctsp-top-left-grp'>
                            <div className='ctsp-top-grp'>

                                <div className='ctsp-due-date-grp'>
                                    <div className='ctsp-date-label-div'>
                                        <p className='ctsp-date-label'>Start Date</p>
                                    </div>
                                    <input
                                        className='ctsp-date-input'
                                        type='date'
                                        value={startDate}
                                        min={dateToday()}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                    <select
                                        className='ctsp-time-select'
                                        value={startTime}
                                        disabled={startDate.length > 0 ? false : true}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    >
                                        <option value=''>Start Time</option>
                                        {selectMenuTimes.map((option) =>
                                            <option
                                                key={option.value}
                                                value={option.value}
                                                disabled={compareStartToCurrentTime(option.value)}
                                            >
                                                {option.display}
                                            </option>
                                        )}
                                    </select>
                                </div>
                                <div className='ctsp-due-date-grp'>
                                    <div className='ctsp-date-label-div'>
                                        <p className='ctsp-date-label'>Due Date</p>
                                    </div>
                                    <input
                                        className='ctsp-date-input'
                                        type='date'
                                        value={dueDate}
                                        min={startDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                    />
                                    <select
                                        className='ctsp-time-select'
                                        value={dueTime}
                                        disabled={dueDate.length > 0 ? false : true}
                                        onChange={(e) => setDueTime(e.target.value)}
                                    >
                                        <option value=''>Due Time</option>
                                        {selectMenuTimes.map((option) =>
                                            <option
                                                key={option.value}
                                                value={option.value}
                                                disabled={compareTimeToStart(option.value)}
                                            >
                                                {option.display}
                                            </option>
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
                                        <option key={l.id} value={l.id}>{l.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className='ctsp-left-bot-grp'>
                                <input
                                    className='ctsp-time-input'
                                    placeholder='Time estimate'
                                    type='number'
                                    min={1}
                                    max={72*60}
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
                                <optgroup label='Tags' />
                                {Object.values(tags).map((t) =>
                                    <option key={t.id} className='sel-op' value={t.id}>{t.name}</option>
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
