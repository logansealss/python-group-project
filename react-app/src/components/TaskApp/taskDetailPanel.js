import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSingleTask, updateATask, getAllTasks, addTagToTask, removeTagFromTask } from '../../store/tasks';
import removeNullProperties from '../../utils/updateFunction';

import selectMenuTimes from '../../data/selectMenuTimes.json';
// import dueDateIcon from '../../img/calendar-day.svg';
// import startDateIcon from '../../img/square-caret-right.svg';
// import prioIcon from '../../img/exclamation.svg';
// import listIcon from '../../img/list.svg';
// import clockIcon from '../../img/clock.svg';
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

    const [tdTaskName, setTdTaskName] = useState('');
    const [tdDueDate, setTdDueDate] = useState('');
    const [tdDueTime, setTdDueTime] = useState('');
    const [tdStartDate, setTdStartDate] = useState('');
    const [tdStartTime, setTdStartTime] = useState('');
    const [tdTaskList, setTdTaskList] = useState(listId);
    const [tdPrio, setTdPrio] = useState('');
    const [tdTaskTags, setTdTaskTags] = useState([]);
    const [tdEstimate, setTdEstimate] = useState('');
    const [tdEstimateUnit, setTdEstimateUnit] = useState(1)
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

    const padNum = (num) => {
        return num.toString().padStart(2, '0');
    }

    const parseDateObj = (dateInput, timeInput) => {
        return new Date(dateInput + 'T' + timeInput);
    }

    const datesValid = () => {
        if (tdStartDate && tdStartTime && tdDueDate && tdDueTime) {
            return parseDateObj(tdStartDate, tdStartTime).getTime() <
                parseDateObj(tdDueDate, tdDueTime).getTime()
        }
        return false;
    }

    const compareTimeToStart = (time) => {
        if (tdStartDate === tdDueDate) {
            return parseDateObj(tdStartDate, tdStartTime).getTime() >
                parseDateObj(tdStartDate, time).getTime()
        } else {
            return false;
        }
    }

    const compareStartToCurrentTime = (time) => {
        if (tdStartDate) {
            return parseDateObj(tdStartDate, time).getTime() <
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

    const createDateDisplay = (date, time) => {
        if (date) {
            return `${dateFormatter(date)} at ${timeFormatter(time)}`
        } else return 'Not Assigned'
    }

    useEffect(() => {
        if (!datesValid()) {
            setTdDueDate(tdStartDate)
            setTdDueTime(tdStartTime)
        }

        if (!tdDueDate) {
            setTdDueTime('');
        }
        if (!tdStartDate) {
            setTdStartTime('');
        }

    }, [tdStartDate, tdStartTime, tdDueDate, tdDueTime])


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
            return `${(hours - 12)}:${mins} pm`;
        }
        if (hours < 12 && hours > 0) {
            return `${hours}:${mins} am`;
        }
        if (hours === 0 && mins){
            return `12:${mins} am`;
        } else {
            return `12:01 am`
        }
    }

    const estFormatter = () => {

        if (task.duration) {
            const time = task.duration;
            if (time > 59) {
                return `${Math.floor(time / 60)} hour${time > 120 ? 's' : ''} ${time % 60} minutes`
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
            if (task.name){
                setTdTaskName(task.name);
            } else setTdTaskName('');
            if(task.dueDate){
              setTdDueDate(task.dueDate.split(' ')[0]);
              setTdDueTime(task.dueDate.split(' ')[1]);
            } else {
                setTdDueDate('');
                setTdDueTime('');
            }
            if(task.startDate){
                setTdStartDate(task.startDate.split(' ')[0]);
                setTdStartTime(task.startDate.split(' ')[1]);
            } else {
                setTdStartDate('');
                setTdStartTime('');
            }
            if(Number(task.listId)){
                setTdTaskList(Number(task.listId));
            } else {
                setTdTaskList('');
            }
            if(Number(task.priority)){
                setTdPrio(Number(task.priority));
            } else {
                setTdPrio('');
            }
            if(task.tags && task.tags.length){
                setTdTaskTags(task.tags);
            } else {
                setTdTaskTags([]);
            }
            if(task.duration){
                setTdEstimate(task.duration);
            } else {
                setTdEstimate();
            }
            if(task.note){
                setTdNotes(task.note);
            } else {
                setTdNotes('');
            }
        }
    }, [task]);


    const updateNotes = async (e) => {
        e.preventDefault();

        const data = removeNullProperties(task);
        data.note = tdNotes;

        const res = await dispatch(updateATask(task.id, data));

        if (res) {
            setTdNotesSaved(true);
        }
    }

    useEffect(() => {
    }, [tdPrio])

    const handleUtSubmit = async (e) => {
        e.preventDefault();

        // const data = removeNullProperties(task);
        const data = {}
        if(task.note){
            data.note = task.note;
        }

        if (tdTaskName.length) data.name = tdTaskName


        if (Number(tdPrio) && tdPrio >= 0 && tdPrio <= 3) {
            data.priority = tdPrio
        } else {
            data.priority = 0
        }
        if (tdStartDate.length && tdStartTime.length){
            data.start_date = tdStartDate + ' ' + tdStartTime
        } else if (tdStartDate.length && !tdStartTime.length) {
            data.start_date = tdStartDate + ' ' + '00:01:00'
        }

        if (tdDueDate.length && tdDueTime.length){
            data.due_date = tdDueDate + ' ' + tdDueTime
        } else if (tdDueDate.length && !tdDueTime.length) {
            data.due_date = tdDueDate + ' ' + '00:01:00'
        }

        if (Number(tdTaskList)) data.list_id = Number(tdTaskList);
        if (Number(tdEstimate)) data.duration = Math.ceil(tdEstimate * tdEstimateUnit);


        const newTags = new Set(tdTaskTags.map(id => +id));
        const oldTags = new Set(task.tags)

        const tagsToAdd = []
        const tagsToRemove = []

        for(let [id, _] of newTags.entries()){
            if (!oldTags.has(id)){
                tagsToAdd.push(id)
            }
        }

        for(let [id, _] of oldTags.entries()){
            if (!newTags.has(id)){
                tagsToRemove.push(id)
            }
        }

        for(let id of tagsToRemove){
            await dispatch(removeTagFromTask(task.id, id))
        }

        for(let id of tagsToAdd){
            await dispatch(addTagToTask(task.id, id))
        }


        const res = (dispatch(updateATask(task.id, data)))
        // await dispatch(getSingleTask(task.id));
        // await dispatch(getAllTasks());
        setRenderTadForm(false);
        // setSubmitted(true);
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
                            value={tdTaskName}
                            required={true}
                            onChange={(e) => setTdTaskName(e.target.value)}
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
                                            <p className='tad-date-label'>Start Date</p>
                                        </div>
                                        <input
                                            className='tad-date-input'
                                            type='date'
                                            value={tdStartDate}
                                            min={dateToday()}
                                            onChange={(e) => setTdStartDate(e.target.value)}
                                        />
                                        <select
                                            className='tad-time-select'
                                            value={tdStartTime}
                                            disabled={tdStartDate.length > 0 ? false : true}
                                            onChange={(e) => setTdStartTime(e.target.value)}
                                        >
                                            <option value=''>Start Time</option>
                                            {selectMenuTimes.map((option) =>
                                                <option
                                                    value={option.value}
                                                    disabled={compareStartToCurrentTime(option.value)}
                                                >
                                                    {option.display}
                                                </option>
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
                                            value={tdDueDate}
                                            min={tdStartDate}
                                            onChange={(e) => setTdDueDate(e.target.value)}
                                        />
                                        <select
                                            className='tad-time-select'
                                            value={tdDueTime}
                                            disabled={tdDueDate.length > 0 ? false : true}
                                            onChange={(e) => setTdDueTime(e.target.value)}
                                        >
                                            <option value=''>Due Time</option>
                                            {selectMenuTimes.map((option) =>
                                                <option
                                                    value={option.value}
                                                    disabled={compareTimeToStart(option.value)}
                                                >
                                                    {option.display}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className='tad-mid-grp-lf'>
                                    <select
                                        className='tad-time-select'
                                        value={`${tdPrio}`}
                                        onChange={(e) => setTdPrio(Number(e.target.value))}
                                    >
                                        <option value=''>Priority</option>
                                        <option value='1'>High</option>
                                        <option value='2'>Med</option>
                                        <option value='3'>Low</option>
                                        <option value='0'>None</option>
                                    </select>
                                    <select
                                        className='tad-time-select'
                                        value={tdTaskList}
                                        onChange={(e) => setTdTaskList(e.target.value)}
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
                                        min={1}
                                        value={tdEstimate}
                                        onChange={(e) => setTdEstimate(e.target.value)}
                                    />

                                    <select
                                        className='tad-time-select'
                                        value={`${tdEstimateUnit}`}
                                        onChange={(e) => setTdEstimateUnit(Number(e.target.value))}
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
                                    value={tdTaskTags}
                                    onChange={(e) => setTdTaskTags(
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
                                {/* <img
                                    className='tad-at-icon-style'
                                    src={dueDateIcon}
                                />

                                <img className='tad-at-icon-style' src={startDateIcon} />
                                <img className='tad-at-icon-style' src={listIcon} />
                                <img className='tad-at-icon-style' src={prioIcon} />
                                {/* <img className='tad-at-icon-style' src={repeatIcon} />
                            <img className='tad-at-icon-style' src={locationPin} /> */}
                                {/* <img className='tad-at-icon-style' src={clockIcon} /> */}
                            </div>
                            <button
                                className='tad-ct-submit-btn'
                                type='submit'
                                disabled={tdTaskName.length ? false : true}
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
                            Start Date:
                        </p>
                        <p className='td-data-p'>
                            {createDateDisplay(tdStartDate, tdStartTime)}
                        </p>
                    </div>
                    <div className='td-label-div'>
                        <p className='td-label-p'>
                            Due Date:
                        </p>
                        <p className='td-data-p'>
                            {createDateDisplay(tdDueDate, tdDueTime)}
                        </p>
                    </div>
                    <div className='td-label-div'>
                        <p className='td-label-p'>
                            Priority:
                        </p>
                        <p className='td-data-p'>
                            {tdPrio ? prios[tdPrio] : 'Not Assigned'}
                        </p>
                    </div>
                    <div className='td-label-div'>
                        <p className='td-label-p'>
                            List:
                        </p>
                        {
                            task.listId && lists[task.listId] ?
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

                        {task.tags && task.tags.map((tagId) =>
                            tags[tagId] ? (
                            <Link className='td-data-link' to={`/app/tags/${tagId}`}>
                                <div className={'td-tag'}
                                    style={{ color: 'white', backgroundColor: tags[String(tagId)].color }}
                                >
                                    {tags[tagId.toString()].name}
                                </div>
                            </Link>) : null
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
