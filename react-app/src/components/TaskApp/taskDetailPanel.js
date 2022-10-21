import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSingleTask, updateATask, getAllTasks } from '../../store/tasks';

import selectMenuTimes from '../../data/selectMenuTimes.json';
import dueDateIcon from '../../img/calendar-day.svg';
import startDateIcon from '../../img/square-caret-right.svg';
import prioIcon from '../../img/exclamation.svg';
import listIcon from '../../img/list.svg';
import clockIcon from '../../img/clock.svg';
import editIcon from '../../img/pen-to-square.svg'
// import postponeIcon from '../../img/calendar-plus.svg';
// import repeatIcon from '../../img/rotate.svg';
// import locationPin from '../../img/location-dot.svg';
// import userIcon from '../../img/user.svg';
// import checkIcon from '../../img/check.svg';
// import tagIcon from '../../img/tag.svg';
// import minusIcon from '../../img/minus.svg';
// import EliIcon from '../../img/ellipsis.svg';
// import downCaret from '../../img/caret-down.svg';
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
    const [tdNotes, setTdNotes] = useState('')
    const [tdNotesSaved, setTdNotesSaved] = useState(true);

    const [renderTadForm, setRenderTadForm] = useState(false);
    const [tadFormDiv, setTadFormDiv] = useState();

    const formRef = useRef();

    const prios = {
        1: 'High',
        2: 'Med',
        3: 'Low',
        0: 'None'
    }

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const dateFormatter = (dateStr) => {
        const dateArr = dateStr.split('-');
        const y = dateArr[0];
        const m = Number(dateArr[1]);
        const d = dateArr[2];
        return `${months[m - 1]} ${d}, ${y}`
    }

    const timeFormatter = (timeStr) => {
        const timeArr = timeStr.split(':');
        const hours = Number(timeArr[0]);
        const mins = timeArr[1];
        if (hours > 12) {
            return `${(hours - 12)} ${mins} pm`;
        }
        if (hours < 12) {
            return `${hours}:${mins} am`;
        }
    }

    const estFormatter = () => {

        if (task.duration){
            const time = task.duration;
            if (time > 59){
                return `${Math.floor(time/60)} hour${time > 120 ? 's' : ''} ${time % 60} minutes`
            } else {
                return `${task.duration} minutes`
            }
        } else {
            return 'Not Assigned'
        }
    }

    const openForm = () => {
        if (tadFormDiv) {
            tadFormDiv.style.height = '340px'
        }
        setRenderTadForm(true);
    }

    const closeForm = () => {
        setRenderTadForm(false);
        if (tadFormDiv) {
            tadFormDiv.style.height = '0px';
        }
    }

    useEffect(() => {

        if (task && tdNotes !== task.note) {
            setTdNotesSaved(false);
        } else if (task && tdNotes === task.notes) {
            setTdNotesSaved(true);
        }
    }, [tdNotes])

    useEffect(() => {
        setTadFormDiv(document.getElementsByClassName('tad-add-task-grp')[0]);
        if (tadFormDiv) {
            tadFormDiv.style.height = '0px';
        }
    }, [formRef, task]);

    useEffect(() => {

        if (task) {
            task.name && setTaskName(task.name);
            task.dueDate && setDueDate(task.dueDate.split(' ')[0]);
            task.dueDate && setDueTime(task.dueDate.split(' ')[1]);
            task.startDate && setStartDate(task.startDate.split(' ')[0]);
            task.startDate && setStartTime(task.startDate.split(' ')[1]);
            task.listId && setTaskList(task.listId);
            task.priority ? setPrio(task.priority) : setPrio(0);
            task.tags && setTaskTags(task.tags);
            task.duration && setEstimate(task.duration);
            task.note ? setTdNotes(task.note) : setTdNotes('');
        }
    }, [task]);


    const updateNotes = async (e) => {
        e.preventDefault();

        const data = {
            name: taskName,
            note: tdNotes,
        }

        const res = await dispatch(updateATask(task.id, data));

        if (res) {
            setTdNotesSaved(true);
        }
    }

    const handleUtSubmit = (e) => {
        e.preventDefault();

        const data = {}

        if (taskName.length) data.name = taskName
        if (prio.length) data.priority = prio
        if (startDate.length && startTime.length)
            data.start_date = startDate + ' ' + startTime
        if (dueDate.length && dueTime.length)
            data.due_date = dueDate + ' ' + dueTime
        if (Number(taskList)) data.list_id = taskList
        if (Number(estimate)) data.duration = Math.ceil(estimate * estimateUnit)


        console.log('form data: ', data);
        const res = (dispatch(updateATask(task.id, data)))
        dispatch(getSingleTask(task.id));
        dispatch(getAllTasks());
        setRenderTadForm(false);
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
                        />
                        <div
                            className='tad-edit-div'
                            onClick={renderTadForm ? closeForm : openForm}
                        >
                            <img className='tad-edit-icon' src={editIcon} />
                        </div>
                    </div>
                    <div
                        className={'tad-add-task-grp'}
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

            <div className='td-task-detail-main'>
                <div className='td-upper-detail'>
                    <div className='td-label-div'>
                        <p className='td-label-p'>
                            Due Date:
                        </p>
                        <p className='td-data-p'>
                            {dateFormatter(dueDate)}
                            {' at '}
                            {timeFormatter(dueTime)}
                        </p>
                    </div>
                    <div className='td-label-div'>
                        <p className='td-label-p'>
                            Start Date:
                        </p>
                        <p className='td-data-p'>
                            {dateFormatter(startDate)}
                            {' at '}
                            {timeFormatter(startTime)}
                        </p>
                    </div>
                    <div className='td-label-div'>
                        <p className='td-label-p'>
                            Priority:
                        </p>
                        <p className='td-data-p'>
                            {prios[prio]}
                        </p>
                    </div>
                    <div className='td-label-div'>
                        <p className='td-label-p'>
                            List:
                        </p>
                        {
                            task.listId ?
                                <p className='td-data-p'>
                                    <Link
                                        className='td-data-link'
                                        to={`/app/lists/${task.listId}`}
                                    >
                                        {`${lists[String(task.listId)].name}`}
                                    </Link>
                                </p>
                                :
                                <p className='td-data-p'>
                                    Not assigned
                                </p>
                        }
                    </div>
                    <div className='td-label-div'>
                        <p className='td-label-p'>
                            Est. Time:
                        </p>
                        <p className='td-data-p'>
                            {estFormatter(task.duration)}
                        </p>
                    </div>
                    <div className='td-tag-div'>
                        <p className='td-label-p'>
                            Tags:
                        </p>

                        {task.tags.map((tagId) =>

                            <Link className='td-data-link' to={`/app/tags/${tagId}`}>
                                <div className={'td-tag'}
                                    style={{ color: 'white', backgroundColor: tags[String(tagId)].color }}
                                >
                                    {tags[tagId.toString()].name}
                                </div>
                            </Link>
                        )}
                    </div>
                    <div className='td-label-div-notes'>
                        <p className='td-label-p'>
                            Notes:
                        </p>
                    </div>
                    <form
                        className='td-notes-form'
                        onSubmit={updateNotes}
                    >
                        <div className='td-notes-div'>

                            <textarea
                                className='td-notes-input'
                                type='text'
                                value={tdNotes}
                                onChange={(e) => setTdNotes(e.target.value)}
                            />
                            <button
                                className='td-notes-save-btn'
                                type='submit'
                                disabled={tdNotesSaved}
                            >
                                Save Notes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
}
